import { Display, Processor, Product } from "@prisma/client"

export type IProductCreatingData = {
    Product: Product;
    Display: Display;
    Processor: Processor;
}