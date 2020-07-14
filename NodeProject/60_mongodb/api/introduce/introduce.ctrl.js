// //데이터
// let nextId = 4;
// let movie = [
//     {id: 1, title: "스타워즈", director: "조지 루카스", year: "1977"},
//     {id: 2, title: "어벤져스", director: "조스 휘던", year: "2012"},
//     {id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014"}
// ];

const MovieModel = require("../../models/movie");
const mongoose = require("mongoose");

//id 유효성 체크하는 함수 따로 뽑기
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

// 목록조회
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10);

    if (Number.isNaN(limit)) return res.status(400).end();

    MovieModel.find((err, result) => {
            if (err) return res.status(500).end();
            //res.json(result);
            console.log(result);
            res.render("movie/list", {
                result
            });
        })
        .limit(limit)
        .sort({
            _id: -1
        });
};

// 상세조회
const detail = (req, res) => {
    const id = req.params.id;

    // 유효한 id인지 체크


    // id로 조회
    MovieModel.findById(id, (err, result) => { //findById 대신 findOne 써도 됌. (대신 조회 조건 써야됌.)
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        //res.json(result);
        res.render("movie/detail", {
            result
        })
    });
};

// 등록 완료
const create = (req, res) => {
    const {
        title,
        director,
        year
    } = req.body;
    if (!title || !director || !year) return res.status(400).end();

    // 1. Model -> Document
    /*
    const music = new MusicModel( {singer,title});
    music.save((err, result) => {
        if(err) return res.status(500).end();
        res.status(201).json(result);
    })
    */

    // 2. Model.create()
    MovieModel.create({
        title,
        director,
        year
    }, (err, result) => {
        if (err) res.status(500).end();
        res.status(201).json(result);
    })
};

// 수정
const update = (req, res) => {
    const id = req.params.id;

    // 1. 유효한 id인지 체크

    const {
        title,
        director,
        year
    } = req.body; //먼저 값을 뽑아오기
    // 2. id에 해당되는 document에 data update
    MovieModel.findByIdAndUpdate(
        id, {
            title,
            director,
            year
        }, {
            new: true
        }, //option 주기 (update 한 데이터 바로 보여주기)
        (err, result) => {
            if (err) return res.status(500).send("수정 시 오류 발생");
            if (!result) return res.status(404).send("해당하는 정보가 없습니다");
            res.json(result);
        });
};
// 삭제
const remove = (req, res) => {
    const id = req.params.id;

    // 1. 유효한 id인지 체크

    // 2. id에 해당하는 document를 찾아서 DB에서 삭제
    MovieModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 시 오류가 발생했습니다");
        if (!result) return res.status(404).send("해당하는 정보가 없습니다");
        res.json(result);
    })
};

const showCreatePage = (req, res) => {
    res.render("movie/create");
};

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    MovieModel.findById(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.render("movie/update", {
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
    showUpdatePage
}