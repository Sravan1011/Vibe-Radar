import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, LineChart, MessageSquare, Radar } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative">
        <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
          1
        </div>
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Define Questions</h3>
          <p className="text-muted-foreground">Create a set of questions to ask different AI models</p>
        </CardContent>
      </Card>

      <Card className="relative">
        <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
          2
        </div>
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
          <BrainCircuit className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Query AI Models</h3>
          <p className="text-muted-foreground">Our system periodically asks these questions to multiple AI models</p>
        </CardContent>
      </Card>

      <Card className="relative">
        <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
          3
        </div>
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
          <Radar className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Analyze Responses</h3>
          <p className="text-muted-foreground">We process and analyze the responses to identify patterns and biases</p>
        </CardContent>
      </Card>

      <Card className="relative">
        <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
          4
        </div>
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
          <LineChart className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Visualize Trends</h3>
          <p className="text-muted-foreground">See how AI opinions evolve over time with interactive visualizations</p>
        </CardContent>
      </Card>
    </div>
  )
}
