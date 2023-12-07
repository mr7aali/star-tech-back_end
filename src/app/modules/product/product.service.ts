import { Product } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData, getSingleProductCondition } from "./product.interface"
import CustomError from "../../../errors/CustomError"
import { StatusCodes } from "http-status-codes"


const create = async ({ product, spacificationData }: { product: Product, spacificationData: IProductCreatingData }): Promise<any | null> => {



    const productID = await prisma.$transaction(async (tx) => {

        //! product created
        const productResult = await tx.product.create({ data: product })

        //! specification created
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        })
        const specification_id = Number(specificationResult.id)



        for (const [tableName, recordData] of Object.entries(spacificationData)) {
            const recordDataWithForeignKey = { ...recordData, specification_id }
            await (tx as any)[tableName].create({
                data: recordDataWithForeignKey
            });
        }
        return productResult.id;
    })
    const result = await prisma.product.findUnique({
        where: {
            id: productID
        },
        include: {
            Specification: {
                include: {
                    display: true,
                    product: true,
                    processor: true

                }
            }
        }
    })

    return result
}

const getAll = async () => {
    const result = await prisma.product.findMany({});


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
                    display: {
                        select: {
                            id: false,
                            specification_id: false,
                            // Include other fields you need
                            size: true,
                            type: true,
                            resolution: true,
                            touch_screen: true,
                            refresh_rate: true,
                            features: true

                        }
                    },

                    processor: {
                        select: {
                            id: false,
                            specification_id: false,

                            brand: true,
                            model: true,
                            generation: true,
                            frequency: true,
                            core: true,
                            thread: true,
                            cpu_cache: true,
                        }
                    },
                    Audio: {
                        select: {
                            id: false,
                            specification_id: false,

                            speaker_BuiltIn: true,
                            speaker_details: true,
                        }
                    },
                    Camera: {
                        select: {
                            id: false,
                            specification_id: false,

                            audioFeature: true,
                            microphone: true,
                            speaker: true,
                            webCam: true
                        }
                    },
                    Connectivity: {
                        select: {
                            id: false,
                            specification_id: false,

                            display_port: true,
                            hdmi: true,
                        }
                    },
                    FrontCamera: {
                        select: {
                            id: false,
                            specification_id: false,

                            resolution: true,
                            feature: true,
                            videoRecording: true,
                        }
                    },
                    Graphics: {
                        select: {
                            id: false,
                            specification_id: false,
                            model: true,
                            memory: true,
                        }
                    },
                    Keyboard: {
                        select: {
                            id: false,
                            specification_id: false,
                            type: true,
                            features: true,
                            isTouchPad: true
                        }
                    },
                    Memory: {
                        select: {
                            id: false,
                            specification_id: false,

                            ram: true,
                            ram_type: true,
                            removable: true,
                            total_ram_slot: true,
                            max_ram_capacity: true,
                        }
                    },
                    NetworkConnectivity: {
                        select: {
                            id: false,
                            specification_id: false,

                            sim: true,
                            network: true,
                            wifi: true,
                            bluetooth: true,
                            gps: true,
                            nfc: true,
                            usb: true,
                            otg: true,
                            audioJack: true,
                        }
                    },
                    Os: {
                        select: {
                            id: false,
                            specification_id: false,

                            OsSystem: true,
                            upgradable: true,
                        }
                    },
                    PhysicalSpecification: {
                        select: {
                            id: false,
                            specification_id: false,
                            color: true,
                            dimensions: true,
                            weight: true,
                            bodyMaterial: true,
                        }
                    },
                    PortsSlots: {
                        select: {
                            id: false,
                            specification_id: false,

                            opticalDrive: true,
                            cardReader: true,
                            vga: true,
                            displayPort: true,
                            hdmiPort: true,
                            usb2Port: true,
                            usb3Port: true,
                            usbTypeC: true,
                        }
                    },
                    Power: {
                        select: {
                            id: false,
                            specification_id: false,
                            type: true,
                            voltage: true,
                        }
                    },
                    RearCamera: {
                        select: {
                            id: false,
                            specification_id: false,

                            resolution: true,
                            feature: true,
                            videoRecording: true,
                        }
                    },
                    Security: {
                        select: {
                            id: false,
                            specification_id: false,

                            isHasfingerprintSensor: true,
                            securityChip: true
                        }
                    },
                    Storage: {
                        select: {
                            id: false,
                            specification_id: false,
                            storage_type: true,
                            storage_capacity: true,
                            hdd_rpm: true,
                            isExtraM2_slot: true
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