// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title AcademicCertificate
 * @dev NFT-based academic certificate management system
 * @author Naammmdz - Blockchain Academic Records Team
 */
contract AcademicCertificate is 
    ERC721, 
    Ownable, 
    AccessControl, 
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // ==================== ROLES ====================
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant REVOKER_ROLE = keccak256("REVOKER_ROLE");

    // ==================== STRUCTS ====================
    struct Certificate {
        string studentName;
        string studentId;
        string degree;
        string major;
        string university;
        uint256 graduationDate;
        string ipfsHash;
        bool isValid;
        uint256 issuedAt;
        address issuer;
        string gpa;
        string additionalInfo;
    }

    // ==================== MAPPINGS ====================
    mapping(uint256 => Certificate) public certificates;
    mapping(uint256 => string) private _tokenURIs;
    mapping(string => uint256) public studentIdToCertificate;
    mapping(address => uint256[]) public studentCertificates;
    mapping(string => bool) public universityApproved;
    mapping(string => address) public universityIssuers;
    mapping(address => string) public issuerToUniversity;
    
    // Statistics
    mapping(string => uint256) public certificatesByUniversity;
    mapping(string => uint256) public certificatesByDegree;
    mapping(uint256 => uint256) public certificatesByYear;

    // ==================== EVENTS ====================
    event CertificateIssued(
        uint256 indexed tokenId,
        string studentName,
        string studentId,
        string degree,
        string university,
        address indexed recipient,
        address indexed issuer,
        uint256 issuedAt
    );
    
    event CertificateRevoked(
        uint256 indexed tokenId,
        string reason,
        address indexed revokedBy,
        uint256 revokedAt  
    );
    
    event UniversityApproved(
        string indexed university,
        address indexed approvedBy,
        uint256 approvedAt
    );

    // ==================== CONSTRUCTOR ====================
    constructor() ERC721("AcademicCertificate", "ACERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        _grantRole(REVOKER_ROLE, msg.sender);
    }

    // ==================== MODIFIERS ====================
    modifier onlyIssuer() {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
        _;
    }

    modifier validStudentId(string memory studentId) {
        require(bytes(studentId).length > 0, "Student ID cannot be empty");
        require(studentIdToCertificate[studentId] == 0, "Certificate for this student already exists");
        _;
    }

    modifier approvedUniversity(string memory university) {
        require(universityApproved[university], "University not approved");
        _;
    }

    modifier validCertificate(uint256 tokenId) {
        require(_exists(tokenId), "Certificate does not exist");
        _;
    }

    // ==================== CORE FUNCTIONS ====================
    
    function issueCertificate(
        address recipient,
        string memory studentName,
        string memory studentId,
        string memory degree,
        string memory major,
        string memory university,
        uint256 graduationDate,
        string memory ipfsHash,
        string memory gpa
    ) 
        public 
        onlyIssuer 
        nonReentrant 
        validStudentId(studentId)
        approvedUniversity(university)
        returns (uint256) 
    {
        require(recipient != address(0), "Recipient cannot be zero address");
        require(bytes(studentName).length > 0, "Student name cannot be empty");
        require(graduationDate <= block.timestamp, "Graduation date cannot be in the future");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, ipfsHash);
        
        certificates[newTokenId] = Certificate({
            studentName: studentName,
            studentId: studentId,
            degree: degree,
            major: major,
            university: university,
            graduationDate: graduationDate,
            ipfsHash: ipfsHash,
            isValid: true,
            issuedAt: block.timestamp,
            issuer: msg.sender,
            gpa: gpa,
            additionalInfo: ""
        });
        
        studentIdToCertificate[studentId] = newTokenId;
        studentCertificates[recipient].push(newTokenId);
        
        // Update statistics
        certificatesByUniversity[university]++;
        certificatesByDegree[degree]++;
        certificatesByYear[_getYear(graduationDate)]++;
        
        emit CertificateIssued(
            newTokenId, 
            studentName, 
            studentId, 
            degree, 
            university, 
            recipient, 
            msg.sender,
            block.timestamp
        );
        
        return newTokenId;
    }

    function verifyCertificate(uint256 tokenId) 
        public 
        view 
        validCertificate(tokenId)
        returns (bool) 
    {
        return certificates[tokenId].isValid;
    }

    function getCertificate(uint256 tokenId) 
        public 
        view 
        validCertificate(tokenId)
        returns (Certificate memory) 
    {
        return certificates[tokenId];
    }

    function getCertificateByStudentId(string memory studentId) 
        public 
        view 
        returns (Certificate memory) 
    {
        uint256 tokenId = studentIdToCertificate[studentId];
        require(tokenId != 0, "Certificate not found for this student ID");
        return certificates[tokenId];
    }

    function getStudentCertificates(address student) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return studentCertificates[student];
    }

    function revokeCertificate(uint256 tokenId, string memory reason) 
        public 
        onlyIssuer 
        nonReentrant
        validCertificate(tokenId)
    {
        require(certificates[tokenId].isValid, "Certificate already revoked");
        certificates[tokenId].isValid = false;
        emit CertificateRevoked(tokenId, reason, msg.sender, block.timestamp);
    }

    // ==================== UNIVERSITY MANAGEMENT ====================
    
    function approveUniversity(string memory university) 
        public 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(bytes(university).length > 0, "University name cannot be empty");
        universityApproved[university] = true;
        emit UniversityApproved(university, msg.sender, block.timestamp);
    }

    function revokeUniversityApproval(string memory university) 
        public 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        universityApproved[university] = false;
    }

    function assignIssuerToUniversity(address issuer, string memory university)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(universityApproved[university], "University not approved");
        
        universityIssuers[university] = issuer;
        issuerToUniversity[issuer] = university;
        
        _grantRole(ISSUER_ROLE, issuer);
    }

    // ==================== STATISTICS ====================
    
    function getTotalCertificates() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getValidCertificatesCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (_exists(i) && certificates[i].isValid) {
                count++;
            }
        }
        return count;
    }

    function getCertificatesByUniversity(string memory university) 
        public 
        view 
        returns (uint256) 
    {
        return certificatesByUniversity[university];
    }

    function getCertificatesByDegree(string memory degree) 
        public 
        view 
        returns (uint256) 
    {
        return certificatesByDegree[degree];
    }

    function getCertificatesByYear(uint256 year) 
        public 
        view 
        returns (uint256) 
    {
        return certificatesByYear[year];
    }

    // ==================== BATCH OPERATIONS ====================
    
    function batchIssueCertificates(
        address[] memory recipients,
        string[] memory studentNames,
        string[] memory studentIds,
        string[] memory degrees,
        string[] memory majors,
        string[] memory universities,
        uint256[] memory graduationDates,
        string[] memory ipfsHashes,
        string[] memory gpas
    ) 
        public 
        onlyIssuer 
        nonReentrant 
    {
        require(recipients.length == studentNames.length, "Arrays length mismatch");
        require(recipients.length <= 100, "Batch size too large");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            if (studentIdToCertificate[studentIds[i]] == 0) {
                issueCertificate(
                    recipients[i],
                    studentNames[i],
                    studentIds[i],
                    degrees[i],
                    majors[i],
                    universities[i],
                    graduationDates[i],
                    ipfsHashes[i],
                    gpas[i]
                );
            }
        }
    }

    // ==================== INTERNAL FUNCTIONS ====================
    
    function _getYear(uint256 timestamp) internal pure returns (uint256) {
        return 1970 + timestamp / 365 days;
    }

    // ==================== TOKEN URI FUNCTIONS ====================
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    // ==================== REQUIRED OVERRIDES ====================
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}