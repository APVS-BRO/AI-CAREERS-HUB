import { PricingTable } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Choose Your Plan</CardTitle>
          <CardDescription className="text-gray-500">
            Upgrade to Pro or Enterprise and unlock powerful features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Horizontal layout: side-by-side scrolling */}
          <div className="mt-6 flex flex-row space-x-6 overflow-x-auto pb-4">
            {/* Each plan card will render horizontally */}
            <PricingTable
              
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
