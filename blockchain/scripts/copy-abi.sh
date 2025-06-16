#!/bin/bash

# Create contracts directory in frontend if not exists
mkdir -p ../fe/src/contracts

# Copy ABI to frontend
cp artifacts/contracts/AcademicCertificate.sol/AcademicCertificate.json \
   ../fe/src/contracts/

echo "✅ ABI copied to frontend successfully!"
echo "📁 Location: fe/src/contracts/AcademicCertificate.json"