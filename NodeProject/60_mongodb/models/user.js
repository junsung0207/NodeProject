const mongoose = require("mongoose");

// 스키마 생성 (사용자 정보)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // 알아서 여백 제거
        maxlength: 50, // 새로운 속성!을 알려주심 (최대 바이트수)
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //똑같은 이메일이 중복되게 들어가게 하지 않도록
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0 // 0: 일반 사용자, 1: 관리자
    },
    token: {
        type: String
    }
});

// 스키마를 통해 모델 객체 생성
// mongoose.model("모델명", 스키마) -> 모델명s(s자동붙음)
// (만약이게 싫다면?)
// mongoose.model("모델명", 스키마, "컬렉션명")
module.exports = mongoose.model("user", UserSchema);