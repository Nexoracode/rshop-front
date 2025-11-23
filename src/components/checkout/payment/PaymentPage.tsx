import SectionTitle from '@/components/common/SectionTitle'
import QueryClientWrapper from '@/components/layout/QueryClientWrapper'
import { Card } from '@/components/ui/card'
import React from 'react'
import PaymentMethodSelector from '../PaymentMethod'
import CartSummeryInfo from '../CartSummeryInfo'
import CartSummeryProducts from '../CartSummeryProducts'
import PaymentCard from './PaymentCard'

type Props = {}

export default function PaymentPage({}: Props) {
  return (
      <div className="min-h-screen space-y-5">
      <QueryClientWrapper>
        <SectionTitle title="تکمیل سفارش" />
        <div className="flex items-start gap-5">
          <div className="flex-1 space-y-5">
          

            <Card className="p-3 bg-transparent">

              <PaymentMethodSelector />
            </Card>

    
            <Card>
              <div className="px-4">
                <CartSummeryInfo />

                <CartSummeryProducts />
              </div>
          </Card>

          <PaymentCard />
        </div>
      </QueryClientWrapper>
    </div>
  )
}