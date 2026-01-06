import pool from "../model/drawpool";
import type { Difficulty, IQuestionDetail, LanguageTemplates, QuestionMeta } from "../controller/drawAdminController";

export async function getQuestionsQuery(offset: number, limit: number) {
    const text = `SELECT id, name, difficulty 
                    FROM question_detail
                    ORDER BY id
                    LIMIT $1 OFFSET $2`;
    const values = [limit, offset];

    try {
        const { rows } = await pool.query(text, values);
        return rows;
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }

}

export async function getQuestionDetail(qname: string) {
    const text = `SELECT detail 
                    FROM question_detail
                    WHERE name = $1`;
    const values = [qname];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}

export async function updateQuestion(changedDetail: IQuestionDetail,
    changedName: string, changedDifficulty: Difficulty,
    qname: string) {
    const text = `UPDATE question_detail
                    SET detail = $1, qname = $2, qdifficulty = $3
                    WHERE qname = $4
                    RETURNING detail`;
    const values = [changedDetail, changedName, changedDifficulty, qname];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}

export async function createQuestion(newQDetail: IQuestionDetail, newQName: string, newQDifficulty: Difficulty) {
    const text = `INSERT INTO question_detail (name, difficulty, detail)
                    VALUES ($1, $2, $3)
                    RETURNING detail`
    const values = [newQName, newQDifficulty, newQDetail];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}


// TEMPLATES
export async function getQTemplate(qname: string) {
    const text = `SELECT qname, qmeta, langtemplates
                    FROM question_template
                    WHERE qname = $1`;

    const values = [qname];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}

export async function updateQTemplate(changedQmeta: QuestionMeta,
    changedLangtemplates: LanguageTemplates, qname: string) {

    const text = `UPDATE question_template
                    SET qmeta = $1, langtemplates = $2
                    WHERE qname = $3
                    RETURNING qname, qmeta, langtemplates`;
    const values = [changedQmeta, changedLangtemplates, qname];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}




export async function createQTemplate(newQmeta: QuestionMeta, newLangtemplates: LanguageTemplates, newQname: string) {
    const text = `INSERT INTO question_template (qname, qmeta, langtemplates)
                    VALUES ($1, $2, $3)
                    RETURNING qname, qmeta, langtemplates`;
    const values = [newQname, newQmeta, newLangtemplates];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}
