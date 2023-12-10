"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const prisma_1 = require("../../../shared/prisma");
const CustomError_1 = __importDefault(require("../../../errors/CustomError"));
const http_status_codes_1 = require("http-status-codes");
const create = ({ product, spacificationData }) => __awaiter(void 0, void 0, void 0, function* () {
    const productID = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        //! product created
        const productResult = yield tx.product.create({ data: product });
        //! specification created
        const specificationResult = yield tx.specification.create({
            data: { product_id: productResult.id }
        });
        const specification_id = Number(specificationResult.id);
        for (const [tableName, recordData] of Object.entries(spacificationData)) {
            const recordDataWithForeignKey = Object.assign(Object.assign({}, recordData), { specification_id });
            yield tx[tableName].create({
                data: recordDataWithForeignKey
            });
        }
        return productResult.id;
    }));
    const result = yield prisma_1.prisma.product.findUnique({
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
    });
    return result;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.product.findMany({});
    if (!result.length) {
        throw new CustomError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found!");
    }
    return result;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.product.findUnique({
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
                    Front_Camera: {
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
                    Network_Connectivity: {
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
                    Physical_Specification: {
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
                    Rear_Camera: {
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
            if (typeof (result === null || result === void 0 ? void 0 : result.Specification)[key] !== "object" || result.Specification[key] === null) {
                delete (result === null || result === void 0 ? void 0 : result.Specification)[key];
            }
        }
    }
    return result;
});
exports.ProductService = {
    create, getAll, getSingle
};
