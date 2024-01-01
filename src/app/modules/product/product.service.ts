import { Product } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData, getSingleProductCondition } from "./product.interface"
import CustomError from "../../../errors/CustomError"
import { StatusCodes } from "http-status-codes"
import { NextFunction } from "express"


const create = async ({ product, spacificationData, next }: { product: Product, spacificationData: IProductCreatingData, next: NextFunction }): Promise<any | null> => {



    const productID = await prisma.$transaction(async (tx) => {

        //! product created
        const productResult = await tx.product.create({ data: product })

        //! specification created
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        })
        const specification_id = Number(specificationResult.id)



        for (const [tableName, recordData] of Object?.entries(spacificationData)) {

            const recordDataWithForeignKey = { ...recordData, specification_id }
            try {
                await (tx as any)[tableName].create({
                    data: recordDataWithForeignKey
                });
            } catch (err) {
                next(err)
            }

        }

        return productResult.id;
    }, { timeout: 1000000 })
    const result = await prisma.product.findUnique({
        where: {
            id: productID
        },
        include: {
            Specification: {
                include: {
                    Display: true,
                    product: true,
                    Processor: true

                }
            }
        }
    })

    return result
}

const getAll = async () => {
    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const result = await prisma.product.findMany({
        skip,
        take: limit
    });
  

    if (!result.length) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!")
    }

    return result;
}
const getSingle = async (id: string) => {
    const result = await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            Specification: {
                include: {
                    // product: true,
                    Display: {
                        select: {
                            id: false,
                            specification_id: false,
                            // Include other fields you need
                            Size: true,
                            Type: true,
                            Resolution: true,
                            Touch_Screen: true,
                            Refresh_Rate: true,
                            Features: true,

                        }
                    },

                    Processor: {
                        select: {
                            id: false,
                            specification_id: false,

                            Brand: true,
                            Model: true,
                            Generation: true,
                            Frequency: true,
                            Core: true,
                            Thread: true,
                            Cpu_cache: true,
                        }
                    },
                    Audio: {
                        select: {
                            id: false,
                            specification_id: false,

                            Speaker: true,
                            Speaker_Details: true
                        }
                    },
                    Camera: {
                        select: {
                            id: false,
                            specification_id: false,

                            Web_Cam: true,
                            Speaker: true,
                            Microphone: true,
                            Audio_Feature: true,
                        }
                    },
                    Connectivity: {
                        select: {
                            id: false,
                            specification_id: false,

                            Display_Port: true,
                            HDMI: true,
                        }
                    },
                    FrontCamera: {
                        select: {
                            id: false,
                            specification_id: false,

                            Resolution: true,
                            Feature: true,
                            VideoRecording: true,
                        }
                    },
                    Graphics: {
                        select: {
                            id: false,
                            specification_id: false,
                            Model: true,
                            Memory: true,
                        }
                    },
                    Keyboard: {
                        select: {
                            id: false,
                            specification_id: false,
                            Type: true,
                            Features: true,
                            Touch_Pad: true
                        }
                    },
                    Memory: {
                        select: {
                            id: false,
                            specification_id: false,

                            RAM: true,
                            RAM_Type: true,
                            Removable: true,
                            Total_Ram_Slot: true,
                            Max_Ram_Capacity: true,

                        }
                    },
                    NetworkConnectivity: {
                        select: {
                            id: false,
                            specification_id: false,

                            SIM: true,
                            Network: true,
                            Wifi: true,
                            Bluetooth: true,
                            Gps: true,
                            Nfc: true,
                            USB: true,
                            otg: true,
                            Audio_Jack: true,
                        }
                    },
                    Os: {
                        select: {
                            id: false,
                            specification_id: false,

                            Os_System: true,
                            Upgradable: true,
                        }
                    },
                    PhysicalSpecificaion: {
                        select: {
                            id: false,
                            specification_id: false,

                            Color: true,
                            Dimensions: true,
                            Weight: true,
                            Body_Material: true,
                        }
                    },
                    Ports_Slots: {
                        select: {
                            id: false,
                            specification_id: false,

                            Optical_Drive: true,
                            CardReader: true,
                            VGA: true,
                            Display_Port: true,
                            HDMI_Port: true,
                            USB_2_Port: true,
                            USB_3_Port: true,
                            USB_TypeC: true,
                        }
                    },
                    Power: {
                        select: {
                            id: false,
                            specification_id: false,
                            Type: true,
                            Voltage: true,
                        }
                    },
                    RearCamera: {
                        select: {
                            id: false,
                            specification_id: false,

                            Resolution: true,
                            Feature: true,
                            VideoRecording: true,
                        }
                    },
                    Security: {
                        select: {
                            id: false,
                            specification_id: false,

                            Fingerprint_Sensor: true,
                            Security_Chip: true
                        }
                    },
                    Storage: {
                        select: {
                            id: false,
                            specification_id: false,
                            Storage_Type: true,
                            Storage_Capacity: true,
                            hdd_rpm: true,
                            Extra_M2_Slot: true,
                        }
                    },
                },

            },

        },


    });


    if (result && result.Specification) {
        for (const key in result.Specification) {

            if (typeof (result?.Specification as any)[key] !== "object" || (result.Specification as any)[key] === null) {
                delete (result?.Specification as any)[key]
            }
        }
    }

    return result
}





export const ProductService = {
    create, getAll, getSingle
}