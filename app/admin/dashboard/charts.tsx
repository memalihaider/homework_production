'use client'

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  LineChart,
  Line,
  Legend
} from 'recharts'

export interface ChartDataPoint {
  [key: string]: string | number
}

interface RevenueChartProps {
  data: ChartDataPoint[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip 
          formatter={(value) => [`AED ${value}`, '']}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px' }} 
        />
        <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" name="Revenue" />
        <Area type="monotone" dataKey="expenses" stroke="#a855f7" strokeWidth={2} fill="transparent" strokeDasharray="5 5" name="Expenses" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

interface LeadDataPoint {
  name: string
  value: number
  color: string
  [key: string]: string | number
}

interface LeadPieChartProps {
  data: LeadDataPoint[]
}

export function LeadPieChart({ data }: LeadPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={data} 
          cx="50%" 
          cy="50%" 
          innerRadius={70} 
          outerRadius={90} 
          paddingAngle={2} 
          dataKey="value"
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface JobDistributionChartProps {
  data: ChartDataPoint[]
}

export function JobDistributionChart({ data }: JobDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px' }} />
        <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface RechartBarChartProps {
  data: ChartDataPoint[]
  dataKey?: string
  barColor?: string
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  hasLegend?: boolean
}

export function RechartBarChart({ 
  data, 
  dataKey = 'value',
  barColor = '#3b82f6',
  margin = { top: 20, right: 30, left: 0, bottom: 20 },
  hasLegend = false
}: RechartBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px' }} />
        {hasLegend && <Legend />}
        <Bar dataKey={dataKey} fill={barColor} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface RechartLineChartProps {
  data: ChartDataPoint[]
  dataKey?: string
  lineColor?: string
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  hasLegend?: boolean
}

export function RechartLineChart({ 
  data, 
  dataKey = 'value',
  lineColor = '#3b82f6',
  margin = { top: 20, right: 30, left: 0, bottom: 20 },
  hasLegend = false
}: RechartLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px' }} />
        {hasLegend && <Legend />}
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface RechartPieChartProps {
  data: LeadDataPoint[]
  innerRadius?: number
  outerRadius?: number
  hasTooltip?: boolean
}

export function RechartPieChart({ 
  data,
  innerRadius = 0,
  outerRadius = 90,
  hasTooltip = true
}: RechartPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={data} 
          cx="50%" 
          cy="50%" 
          innerRadius={innerRadius} 
          outerRadius={outerRadius} 
          paddingAngle={2} 
          dataKey="value"
          label={(entry) => entry.name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {hasTooltip && <Tooltip formatter={(value) => [`${value}`, 'Count']} />}
      </PieChart>
    </ResponsiveContainer>
  )
}
