import { Display, Processor, Product } from "@prisma/client"

export type IProductCreatingData = {
    Display?: Display;
    Processor?: Processor;
}
export const IncludeAllSpecification = {

    include: {
        audio: true,
        camera: true,
        connectivity: true,
        display: true,
        frontCamera: true,
        graphics: true,
        keyboard: true,
        memory: true,
        networkConnectivity: true,
        os: true,
        physicalSpecificaion: true,
        portsSlots: true,
        power: true,
        processor: true,
        product: true,
        rearCamera: true,
        security: true,
        storage: true,
    }



}
// export const IncludeAllSpecification={


//     include: {
//         // product: true,
//         Display: {
//             select: {
//                 id: true,
//                 specification_id: false,
//                 // Include other fields you need
//                 Size: true,
//                 Type: true,
//                 Resolution: true,
//                 Touch_Screen: true,
//                 Refresh_Rate: true,
//                 Features: true,

//             }
//         },

//         Processor: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Brand: true,
//                 Model: true,
//                 Generation: true,
//                 Frequency: true,
//                 Core: true,
//                 Thread: true,
//                 Cpu_cache: true,
//             }
//         },
//         Audio: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Speaker: true,
//                 Speaker_Details: true
//             }
//         },
//         Camera: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Web_Cam: true,
//                 Speaker: true,
//                 Microphone: true,
//                 Audio_Feature: true,
//             }
//         },
//         Connectivity: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Display_Port: true,
//                 HDMI: true,
//             }
//         },
//         FrontCamera: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Resolution: true,
//                 Feature: true,
//                 VideoRecording: true,
//             }
//         },
//         Graphics: {
//             select: {
//                 id: true,
//                 specification_id: false,
//                 Model: true,
//                 Memory: true,
//             }
//         },
//         Keyboard: {
//             select: {
//                 id: true,
//                 specification_id: false,
//                 Type: true,
//                 Features: true,
//                 Touch_Pad: true
//             }
//         },
//         Memory: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 RAM: true,
//                 RAM_Type: true,
//                 Removable: true,
//                 Total_Ram_Slot: true,
//                 Max_Ram_Capacity: true,

//             }
//         },
//         NetworkConnectivity: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 SIM: true,
//                 Network: true,
//                 Wifi: true,
//                 Bluetooth: true,
//                 Gps: true,
//                 Nfc: true,
//                 USB: true,
//                 otg: true,
//                 Audio_Jack: true,
//             }
//         },
//         Os: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Os_System: true,
//                 Upgradable: true,
//             }
//         },
//         PhysicalSpecificaion: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Color: true,
//                 Dimensions: true,
//                 Weight: true,
//                 Body_Material: true,
//             }
//         },
//         Ports_Slots: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Optical_Drive: true,
//                 CardReader: true,
//                 VGA: true,
//                 Display_Port: true,
//                 HDMI_Port: true,
//                 USB_2_Port: true,
//                 USB_3_Port: true,
//                 USB_TypeC: true,
//             }
//         },
//         Power: {
//             select: {
//                 id: true,
//                 specification_id: false,
//                 Type: true,
//                 Voltage: true,
//             }
//         },
//         RearCamera: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Resolution: true,
//                 Feature: true,
//                 VideoRecording: true,
//             }
//         },
//         Security: {
//             select: {
//                 id: true,
//                 specification_id: false,

//                 Fingerprint_Sensor: true,
//                 Security_Chip: true
//             }
//         },
//         Storage: {
//             select: {
//                 id: true,
//                 specification_id: false,
//                 Storage_Type: true,
//                 Storage_Capacity: true,
//                 hdd_rpm: true,
//                 Extra_M2_Slot: true,
//             }
//         },
//     },


// }
export type IAllTableRecod =
    {
        id: number;
        name: string;
        price: string;
        status: string;
        product_code: string;
        brand: string;
        key_features: string;
        image: string;
    } |
    {
        id: number;
        Size: string;
        Type: string;
        Resolution: string;
        Touch_Screen: string;
        Refresh_Rate: string;
        Features: string;
    } |
    {
        id: number;
        Brand: string;
        Model: string;
        Generation: string;
        Frequency: string;
        Core: string;
        Thread: string;
        Cpu_cache: string;
    } |
    {
        id: number;
        Speaker: string;
        Speaker_Details: string;
    } |
    {
        id: number;
        Display_Port: string;
        HDMI: string;
    } |
    {
        id: number;
        Type: string;
        Voltage: string;
    } |
    {
        id: number;
        RAM: string;
        RAM_Type: string;
        Removable: string;
        Total_Ram_Slot: string;
        Max_Ram_Capacity: string;
    } |
    {
        id: number;
        Storage_Type: string;
        Storage_Capacity: string;
        hdd_rpm: string;
        Extra_M2_Slot: string;
    } |
    {
        id: number;
        Model: string;
        Memory: string;
    } |
    {
        id: number;
        Type: string;
        Features: string;
        Touch_Pad: string;
    } |
    {
        id: number;
        Web_Cam: string;
        Speaker: string;
        Microphone: string;
        Audio_Feature: string;
    } |
    {
        id: number;
        Optical_Drive: string;
        CardReader: string;
        VGA: string;
        Display_Port: string;
        HDMI_Port: string;
        USB_2_Port: string;
        USB_3_Port: string;
        USB_TypeC: string;
    } |
    {
        id: number;
        Fingerprint_Sensor: true,
        Security_Chip: string;
    } |
    {
        id: number;
        Color: string;
        Dimensions: string;
        Weight: string;
        Body_Material: string;
    } |
    {
        id: number;
        Resolution: string;
        Feature: string;
        VideoRecording: string;
    } |
    {
        id: number;
        Resolution: string;
        Feature: string;
        VideoRecording: string;
    } |
    {
        id: number;
        SIM: string;
        Network: string;
        Wifi: string;
        Bluetooth: string;
        Gps: string;
        Nfc: string;
        USB: string;
        otg: string;
        Audio_Jack: string;
    } |
    {
        id: number;
        Os_System: string;
        Upgradable: string;
    }
export type ISpecificationData = {
    product: {
        id: number;
        name: string;
        price: string;
        status: string;
        product_code: string;
        brand: string;
        key_features: string;
        image: string;
    },
    display: {
        id: number;
        Size: string;
        Type: string;
        Resolution: string;
        Touch_Screen: string;
        Refresh_Rate: string;
        Features: string;
    },
    processor: {
        id: number;
        Brand: string;
        Model: string;
        Generation: string;
        Frequency: string;
        Core: string;
        Thread: string;
        Cpu_cache: string;
    },
    audio: {
        id: number;
        Speaker: string;
        Speaker_Details: string;
    },
    connectivity: {
        id: number;
        Display_Port: string;
        HDMI: string;
    },
    power: {
        id: number;
        Type: string;
        Voltage: string;
    },
    memory: {
        id: number;
        RAM: string;
        RAM_Type: string;
        Removable: string;
        Total_Ram_Slot: string;
        Max_Ram_Capacity: string;
    },
    storage: {
        id: number;
        Storage_Type: string;
        Storage_Capacity: string;
        hdd_rpm: string;
        Extra_M2_Slot: string;
    },
    graphics: {
        id: number;
        Model: string;
        Memory: string;
    },
    keyboard: {
        id: number;
        Type: string;
        Features: string;
        Touch_Pad: string;
    },
    camera: {
        id: number;
        Web_Cam: string;
        Speaker: string;
        Microphone: string;
        Audio_Feature: string;
    },
    portsSlots: {
        id: number;
        Optical_Drive: string;
        CardReader: string;
        VGA: string;
        Display_Port: string;
        HDMI_Port: string;
        USB_2_Port: string;
        USB_3_Port: string;
        USB_TypeC: string;
    },
    security: {
        id: number;
        Fingerprint_Sensor: true,
        Security_Chip: string;
    },
    physicalSpecificaion: {
        id: number;
        Color: string;
        Dimensions: string;
        Weight: string;
        Body_Material: string;
    },
    rearCamera: {
        id: number;
        Resolution: string;
        Feature: string;
        VideoRecording: string;
    },
    frontCamera: {
        id: number;
        Resolution: string;
        Feature: string;
        VideoRecording: string;
    },
    networkConnectivity: {
        id: number;
        SIM: string;
        Network: string;
        Wifi: string;
        Bluetooth: string;
        Gps: string;
        Nfc: string;
        USB: string;
        otg: string;
        Audio_Jack: string;
    },
    os: {
        id: number;
        Os_System: string;
        Upgradable: string;
    }
}


export type ITableName =
    "product" |
    "display" |
    "processor" |
    "audio" |
    "connectivity" |
    "power" |
    "memory" |
    "storage" |
    "graphics" |
    "keyboard" |
    "camera" |
    "portsSlots" |
    "security" |
    "physicalSpecificaion" |
    "rearCamera" |
    "frontCamera" |
    "networkConnectivity" |
    "os" 
