"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", Claude: 65, GPT4: 78, Gemini: 72, Llama: 58 },
  { date: "Feb", Claude: 59, GPT4: 80, Gemini: 68, Llama: 62 },
  { date: "Mar", Claude: 80, GPT4: 77, Gemini: 73, Llama: 65 },
  { date: "Apr", Claude: 81, GPT4: 75, Gemini: 79, Llama: 71 },
  { date: "May", Claude: 76, GPT4: 85, Gemini: 80, Llama: 74 },
  { date: "Jun", Claude: 82, GPT4: 87, Gemini: 83, Llama: 78 },
]

export default function TrendChart() {
  return (
    <ChartContainer
      config={{
        Claude: {
          label: "Claude",
          color: "hsl(var(--chart-1))",
        },
        GPT4: {
          label: "GPT-4",
          color: "hsl(var(--chart-2))",
        },
        Gemini: {
          label: "Gemini",
          color: "hsl(var(--chart-3))",
        },
        Llama: {
          label: "Llama",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="aspect-[16/9] w-full p-1"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="Claude" stroke="var(--color-Claude)" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="GPT4" stroke="var(--color-GPT4)" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Gemini" stroke="var(--color-Gemini)" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Llama" stroke="var(--color-Llama)" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
