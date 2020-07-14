const mongoose = require("mongoose");

// 스키마 생성
const MusicSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true,
        trim: true // 알아서 여백 제거
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    where: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

// 스키마를 통해 모델 객체 생성
// mongoose.model("모델명", 스키마) -> 모델명s(s자동붙음)
// (만약이게 싫다면?)
// mongoose.model("모델명", 스키마, "컬렉션명")
module.exports = mongoose.model("music", MusicSchema);