//데이터 - 필요없음, DB에서 작업할거니까


// 요기 다시 써야댐

const MusicModel = require("../../models/music");
const mongoose = require("mongoose");



//id 유효성 체크하는 함수 따로 뽑기
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

// 목록조회 (localhost:3000/api/music?limit=2)
// - 성공
// 1)limit 수만큼 music 객체를 담은 배열을 리턴(200 : OK)
// - 실패
// 1) limit가 숫자가 아닌 경우(400 : Bad Request)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 500);

    if (Number.isNaN(limit)) return res.status(400).end();

    MusicModel.find((err, result) => {
            if (err) return res.status(500).end();
            //res.json(result);
            res.render("music/list", {
                result
            }); //화면에 뽀려주기 위해 데이터 보내기
        })
        .limit(limit)
        .sort({
            _id: -1
        });
};
// 상세조회 (localhost:3000/api/music/:id)
// 성공 : id 에 해당하는 music 객체 리턴 (200: ok)
// 실패 : 유효한 id가 아닌 경우 (400 : Bad requect)
//       해당하는 id가 없는 경우 (404 : Not Found)
const detail = (req, res) => {
    const id = req.params.id;

    // 유효한 id인지 체크


    // id로 조회
    MusicModel.findById(id, (err, result) => { //findById 대신 findOne 써도 됌. (대신 조회 조건 써야됌.)
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        //res.json(result);
        res.render("music/detail", {
            result
        })
    });
};

// 등록 (POST localhost:3000/api/music)
// 성공 : 입력된 singer, title 값으로 객체를 만들고 
//        배열 추가(201: Created)
// 실패 : singer, title 값이 누락시 (400 : Bad Request)
const create = (req, res) => {
    const {
        sentence,
        answer,
        where
    } = req.body;
    // console.log(who);
    if (!sentence || !answer || !where) return res.status(400).end();

    // 1. Model -> Document
    /*
    const music = new MusicModel( {singer,title});
    music.save((err, result) => {
        if(err) return res.status(500).end();
        res.status(201).json(result);
    })
    */

    // 2. Model.create()
    MusicModel.create({
        sentence,
        answer,
        where
    }, (err, result) => {
        if (err) res.status(500).end();
        res.status(201).json(result);
    })
};

// 수정
// 성공 : id에 해당하는 객체의 값을 변경 후 리턴(200: ok)
// 실패 : id가 숫자가 아닌 경우 (400 : Bad Request)
//          해당하는 id가 없는 경우 (404 : Not Found)
const update = (req, res) => {
    const id = req.params.id;

    // 1. 유효한 id인지 체크

    const {
        sentence,
        answer,
        where
    } = req.body; //먼저 값을 뽑아오기
    // 2. id에 해당되는 document에 data update
    MusicModel.findByIdAndUpdate(
        id, {
            sentence,
            answer,
            where
        }, {
            new: true
        }, //option 주기 (update 한 데이터 바로 보여주기)
        (err, result) => {
            if (err) return res.status(500).send("수정 시 오류가 발생했습니다");
            if (!result) return res.status(404).send("해당하는 정보가 없습니다");
            res.json(result);
        });
};

// 삭제 (DELETE localhost:3000/api/music/:id)
// 성공 : 
// 실패 : id가 숫자가 아닌 경우(400: Bad Request)
//        해당하는 id가 없는 경우 (404 : Not Found)
const remove = (req, res) => {
    const id = req.params.id;

    // 1. 유효한 id인지 체크

    // 2. id에 해당하는 document를 찾아서 DB에서 삭제
    MusicModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제시 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다");
        res.json(result);
    })
};

const showCreatePage = (req, res) => {
    res.render("music/create");
};

const showTestPage = (req, res) => {
    const limit = parseInt(req.query.limit || 10);

    if (Number.isNaN(limit)) return res.status(400).end();

    MusicModel.find((err, result) => {
            if (err) return res.status(500).end();
            //res.json(result);
            res.render("music/list", {
                result
            }); //화면에 뽀려주기 위해 데이터 보내기
        })
        .limit(limit)
        .sort({
            _id: -1
        });

    res.render("music/test");


}

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    MusicModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.render("music/update", {
            result
        });
    });
};

module.exports = {
    list,
    detail,
    create,
    update,
    remove,
    checkId,
    showCreatePage,
    showUpdatePage,
    showTestPage
}