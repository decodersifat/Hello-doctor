const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reportType: {
      type: String,
      enum: ["blood_test", "urine_test", "mri", "xray", "other"],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String 
    },
    fileUrl: {
      type: String 
    },
    extractedText: {
      type: String 
    },
    aiResult: {
      type: String 
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Report", ReportSchema);
