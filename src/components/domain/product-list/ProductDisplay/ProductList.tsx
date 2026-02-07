import { Product } from '@/types/product'
import React from 'react'

type Props = {
    products : Array<Product>
}

export default function ProductList({products}: Props) {
  return (
     <div className="flex-1 gap-3 grid grid-cols-1">
            {products.map((product) => <ProductRow {...product} key={product.id} />)
        </div>
  )
}