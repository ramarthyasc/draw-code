"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrevNextCurrentQuestionsQuery = getPrevNextCurrentQuestionsQuery;
exports.getQuestionsQuery = getQuestionsQuery;
exports.getQuestionDetail = getQuestionDetail;
exports.updateQuestion = updateQuestion;
exports.createQuestion = createQuestion;
exports.deleteLastQuestionQuery = deleteLastQuestionQuery;
exports.getQTemplate = getQTemplate;
exports.updateQTemplate = updateQTemplate;
exports.createQTemplate = createQTemplate;
const drawpool_1 = __importDefault(require("../model/drawpool"));
async function getPrevNextCurrentQuestionsQuery(qname) {
    const text = `SELECT id, name, difficulty
                    FROM (
                        (SELECT id, name, difficulty
                        FROM question_detail
                        WHERE id > (
                            SELECT id
                            FROM question_detail
                            WHERE name = $1
                        )
                        ORDER BY id ASC
                        LIMIT 1)

                        UNION ALL

                        (SELECT id, name, difficulty
                        FROM question_detail
                        WHERE name = $1)

                        UNION ALL

                        (SELECT id, name, difficulty
                        FROM question_detail
                        WHERE id < (
                            SELECT id
                            FROM question_detail
                            WHERE name = $1
                        )
                        ORDER BY id DESC
                        LIMIT 1)
                    ) AS prevnext

                    ORDER BY id ASC`;
    const values = [qname];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows;
    }
    catch (err) {
        throw err;
    }
}
async function getQuestionsQuery(offset, limit) {
    const text = `SELECT id, name, difficulty 
                    FROM question_detail
                    ORDER BY id
                    LIMIT $1 OFFSET $2`;
    const values = [limit, offset];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows;
    }
    catch (err) {
        throw err;
    }
}
async function getQuestionDetail(qname) {
    const text = `SELECT detail 
                    FROM question_detail
                    WHERE name = $1`;
    const values = [qname];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
async function updateQuestion(changedDetail, changedName, changedDifficulty, qname) {
    const text = `UPDATE question_detail
                    SET detail = $1, name = $2, difficulty = $3
                    WHERE name = $4
                    RETURNING detail`;
    const values = [changedDetail, changedName, changedDifficulty, qname];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
async function createQuestion(newQDetail, newQName, newQDifficulty) {
    const text = `INSERT INTO question_detail (name, difficulty, detail)
                    VALUES ($1, $2, $3)
                    RETURNING detail`;
    const values = [newQName, newQDifficulty, newQDetail];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
async function deleteLastQuestionQuery() {
    const text = `DELETE FROM question_detail
                    WHERE id = (
                        SELECT id 
                        FROM question_detail
                        ORDER BY id DESC
                        LIMIT 1
                    )
                    RETURNING id, name, difficulty`;
    try {
        const { rows } = await drawpool_1.default.query(text);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
// TEMPLATES
async function getQTemplate(qname) {
    const text = `SELECT id, qname, qmeta, langtemplates
                    FROM question_template
                    WHERE qname = $1`;
    const values = [qname];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
async function updateQTemplate(changedQmeta, changedLangtemplates, qname) {
    const text = `UPDATE question_template
                    SET qmeta = $1, langtemplates = $2
                    WHERE qname = $3
                    RETURNING id, qname, qmeta, langtemplates`;
    const values = [changedQmeta, changedLangtemplates, qname];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
async function createQTemplate(newQmeta, newLangtemplates, newQname) {
    const text = `INSERT INTO question_template (qname, qmeta, langtemplates)
                    VALUES ($1, $2, $3)
                    RETURNING id, qname, qmeta, langtemplates`;
    const values = [newQname, newQmeta, newLangtemplates];
    try {
        const { rows } = await drawpool_1.default.query(text, values);
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=drawQuestionQueries.js.map