export type Order = {
    id?:number
    user_id: number
    status: string
}

export type OrderProduct = {
    id?:number
    user_id: number
    product_id: number
    product_quantity: number

}