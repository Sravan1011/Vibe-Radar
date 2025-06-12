"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, BarChart2 } from "lucide-react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const topics = [
  "Climate Change Solutions",
  "AI Ethics",
  "Economic Policy",
  "Healthcare Systems",
  "Education Reform",
] as const;

type Topic = typeof topics[number];

const aiModels: Record<Topic, { name: string; Claude: number; GPT4: number; Gemini: number; Llama: number }[]> = {
  "Climate Change Solutions": [
    { name: "Renewable Energy", Claude: 85, GPT4: 78, Gemini: 82, Llama: 75 },
    { name: "Carbon Capture", Claude: 65, GPT4: 72, Gemini: 68, Llama: 60 },
    { name: "Nuclear Power", Claude: 55, GPT4: 68, Gemini: 60, Llama: 72 },
    { name: "Reforestation", Claude: 80, GPT4: 75, Gemini: 78, Llama: 70 },
    { name: "Policy Changes", Claude: 75, GPT4: 80, Gemini: 72, Llama: 65 },
  ],
  "AI Ethics": [
    { name: "Transparency", Claude: 90, GPT4: 85, Gemini: 80, Llama: 75 },
    { name: "Fairness", Claude: 85, GPT4: 88, Gemini: 82, Llama: 78 },
    { name: "Privacy", Claude: 80, GPT4: 90, Gemini: 85, Llama: 80 },
    { name: "Accountability", Claude: 75, GPT4: 82, Gemini: 78, Llama: 72 },
    { name: "Safety", Claude: 88, GPT4: 92, Gemini: 85, Llama: 80 },
  ],
  "Economic Policy": [
    { name: "UBI", Claude: 60, GPT4: 65, Gemini: 55, Llama: 50 },
    { name: "Free Market", Claude: 70, GPT4: 75, Gemini: 65, Llama: 80 },
    { name: "Regulation", Claude: 75, GPT4: 70, Gemini: 72, Llama: 65 },
    { name: "Taxation", Claude: 65, GPT4: 68, Gemini: 70, Llama: 60 },
    { name: "Trade Policy", Claude: 72, GPT4: 75, Gemini: 70, Llama: 68 },
  ],
  "Healthcare Systems": [
    { name: "Universal", Claude: 80, GPT4: 75, Gemini: 78, Llama: 65 },
    { name: "Private", Claude: 65, GPT4: 70, Gemini: 68, Llama: 75 },
    { name: "Hybrid", Claude: 75, GPT4: 78, Gemini: 80, Llama: 72 },
    { name: "Preventative", Claude: 85, GPT4: 82, Gemini: 80, Llama: 78 },
    { name: "Telemedicine", Claude: 78, GPT4: 80, Gemini: 82, Llama: 75 },
  ],
  "Education Reform": [
    { name: "Personalized", Claude: 85, GPT4: 80, Gemini: 82, Llama: 75 },
    { name: "Traditional", Claude: 60, GPT4: 65, Gemini: 62, Llama: 70 },
    { name: "Online", Claude: 75, GPT4: 78, Gemini: 80, Llama: 72 },
    { name: "Project-based", Claude: 80, GPT4: 75, Gemini: 78, Llama: 70 },
    { name: "Vocational", Claude: 70, GPT4: 72, Gemini: 75, Llama: 80 },
  ],
};

export default function AIComparisonDemo() {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Opinion Comparison</CardTitle>
        <CardDescription>See how different AI models rank solutions for various topics</CardDescription>
        <div className="flex items-center gap-4 pt-4">
          <Select value={selectedTopic} onValueChange={value => setSelectedTopic(value as Topic)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="bar" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Bar Chart
              </TabsTrigger>
              <TabsTrigger value="grouped" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Grouped
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bar" className="mt-0">
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
              className="aspect-[16/9] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={aiModels[selectedTopic]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="Claude" fill="var(--color-Claude)" />
                  <Bar dataKey="GPT4" fill="var(--color-GPT4)" />
                  <Bar dataKey="Gemini" fill="var(--color-Gemini)" />
                  <Bar dataKey="Llama" fill="var(--color-Llama)" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="grouped" className="mt-0">
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
              className="aspect-[16/9] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={aiModels[selectedTopic]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="Claude" fill="var(--color-Claude)" />
                  <Bar dataKey="GPT4" fill="var(--color-GPT4)" />
                  <Bar dataKey="Gemini" fill="var(--color-Gemini)" />
                  <Bar dataKey="Llama" fill="var(--color-Llama)" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Data updated: June 2024</p>
        <Button variant="outline">View Full Report</Button>
      </CardFooter>
    </Card>
  )
}
