import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '../common';

interface ChartData {
  name: string;
  value: number;
  verified?: number;
  pending?: number;
}

interface ChartsProps {
  recordsOverTime: ChartData[];
  verificationStats: ChartData[];
}

export const Charts: React.FC<ChartsProps> = ({ recordsOverTime, verificationStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Records Over Time */}
      <Card>
        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Hồ sơ theo thời gian</h3>
          <p className="text-sm text-gray-600 mt-1">Số lượng hồ sơ được tạo trong 6 tháng gần đây</p>
        </div>
        <div className="px-6 pb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recordsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Verification Statistics */}
      <Card>
        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Thống kê xác thực</h3>
          <p className="text-sm text-gray-600 mt-1">So sánh hồ sơ đã xác thực và đang chờ</p>
        </div>
        <div className="px-6 pb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={verificationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="verified" fill="#10B981" name="Đã xác thực" />
              <Bar dataKey="pending" fill="#F59E0B" name="Đang chờ" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
