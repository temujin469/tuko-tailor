import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      minlength: [8, "утасны дугаараа зөв оруулан уу"],
      maxlength: [8, "утасны дугаараа зөв оруулан уу"],
    },
    takeDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    images: [{ type: String }],
    orderStatus: {
      type: String,
      enum: ["DUUSSAN", "UTASDSAN", "IRJAWSAN", null],
      default: null,
    },
    bodyInfo: {
      type: {
        undur: {
          type: Number,
        },
        jin: {
          type: Number,
        },
        tseejniiToirog: {
          type: Number,
        },
        ugzugniiToirog: {
          type: Number,
        },
        engeriinToirog: {
          type: Number,
        },
        engeriinUrgun: {
          type: Number,
        },
        engeriinUndur: {
          type: Number,
        },
        ariinUrgun: {
          type: Number,
        },
        ariinUndur: {
          type: Number,
        },
        huhniiUndur: {
          type: Number,
        },
        huhHoorondiinZai: {
          type: Number,
        },
        murniiUrgun: {
          type: Number,
        },
        murHoorondiinZai: {
          type: Number,
        },
        hantsuinUrt: {
          type: Number,
        },
        buglagniiToirog: {
          type: Number,
        },
        buguinToirog: {
          type: Number,
        },
        EngeriinHuzuuniiToirog: {
          type: Number,
        },
        zahniiUndur: {
          type: Number,
        },
        edleliinUrt: {
          type: Number,
        },
      },
      required: true,
    },
    otherInfo: {
      required: true,
      type: {
        undsenMaterial: {
          type: String,
        },
        emjeer: {
          type: String,
        },
        hawchaar: {
          type: String,
        },
        towchShilbe: {
          type: String,
        },
        bus: {
          type: String,
        },
        hatgamal: {
          type: String,
        },
        chimeglel: {
          type: String,
        },
        busad: {
          type: String,
        },
      },
    },
    paymentInfo: {
      required: true,
      type: {
        mainPrice: {
          type: Number,
          required: true,
        },
        uridchilgaa: {
          type: {
            price: {
              type: Number,
              required: true,
            },
            paymentType: {
              type: String,
              enum: ["DANS", "POS", "BELEN"],
              required: true,
            },
          },
          required: true,
        },
        uldegdel: {
          type: {
            price: {
              type: Number,
              required: true,
            },
            paymentType: {
              type: String,
              enum: ["DANS", "POS", "BELEN"],
              required: true,
            },
          },
          required: true,
        },
      },
    },
    workers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "users",
          unique: false,
        },
      ],
      unique: false,
    },
    ceo: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],
          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    coo: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],
          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    manager: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],
          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    designer: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    esguurchin: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    oydolchin: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    hatgamalchin: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    towchShilbe: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
    garChimeglel: {
      type: {
        status: {
          type: String,
          enum: ["EHELSEN", "DUUSSAN", null],

          default: null,
        },
        onoo: {
          type: Number,
          maxlength: 5,
          default: 0,
        },
        _id: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual("isCompleted").get(function () {
  const isCompleted =
    this.ceo?.status === "DUUSSAN" &&
    this.coo?.status === "DUUSSAN" &&
    this.manager?.status === "DUUSSAN" &&
    this.designer?.status === "DUUSSAN" &&
    this.esguurchin?.status === "DUUSSAN" &&
    this.oydolchin?.status === "DUUSSAN" &&
    this.hatgamalchin?.status === "DUUSSAN" &&
    this.towchShilbe?.status === "DUUSSAN" &&
    this.garChimeglel?.status === "DUUSSAN";

  return isCompleted;
});

// orderSchema.virtual("avgOnoo").get(function () {
//   let sum =
//     this.ceo?.onoo +
//     this.coo?.onoo +
//     this.manager?.onoo +
//     this.designer?.onoo +
//     this.esguurchin?.onoo +
//     this.oydolchin?.onoo +
//     this.hatgamalchin?.onoo +
//     this.towchShilbe?.onoo +
//     this.garChimeglel?.onoo;

//   const avgOnoo = sum / 9;

//   return avgOnoo;
// });

const Order = mongoose.model("orders", orderSchema);

export default Order;
