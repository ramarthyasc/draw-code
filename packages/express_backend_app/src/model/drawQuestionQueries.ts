import pool from "../model/drawpool";
import type { Difficulty, IQuestionDetail, ILanguageTemplates, IQuestionMeta } from "../controller/drawQuestionsAndTemplatesController";

export async function getPrevNextCurrentQuestionsQuery(qname: string) {
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
        const { rows } = await pool.query(text, values);
        return rows;
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}

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
                    SET detail = $1, name = $2, difficulty = $3
                    WHERE name = $4
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

export async function deleteLastQuestionQuery() {
    const text = `DELETE FROM question_detail
                    WHERE id = (
                        SELECT id 
                        FROM question_detail
                        ORDER BY id DESC
                        LIMIT 1
                    )
                    RETURNING id, name, difficulty`;

    try {
        const { rows } = await pool.query(text);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
    
}


// TEMPLATES
export async function getQTemplate(qname: string) {
    const text = `SELECT id, qname, qmeta, langtemplates
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

export async function updateQTemplate(changedQmeta: IQuestionMeta,
    changedLangtemplates: ILanguageTemplates, qname: string) {

    const text = `UPDATE question_template
                    SET qmeta = $1, langtemplates = $2
                    WHERE qname = $3
                    RETURNING id, qname, qmeta, langtemplates`;
    const values = [changedQmeta, changedLangtemplates, qname];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}




export async function createQTemplate(newQmeta: IQuestionMeta, newLangtemplates: ILanguageTemplates, newQname: string) {
    const text = `INSERT INTO question_template (qname, qmeta, langtemplates)
                    VALUES ($1, $2, $3)
                    RETURNING id, qname, qmeta, langtemplates`;
    const values = [newQname, newQmeta, newLangtemplates];

    try {
        const { rows } = await pool.query(text, values);
        return rows[0];
    } catch (err) {
        console.log("DB error: ", err);
        throw err;
    }
}
