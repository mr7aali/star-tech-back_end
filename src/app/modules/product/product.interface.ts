import { Display, Processor, Product } from "@prisma/client"

export type IProductCreatingData = {
   
    Display?: Display;
    Processor?: Processor;
}