import {connect} from '../database'

export const getTasks = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM tasks");
    // console.log(rows)
    // res.send('Hello World!!!')
    res.json(rows)
}

export const getTask = async (req, res) => {
    // console.log(req.params.id)
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [
        req.params.id,
    ])
    // console.log(rows[0])
    res.json(rows[0])
    // res.send('Hello World!!!')
}

export const getTasksCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM tasks");
    // console.log(rows)
    res.json(rows[0]["COUNT(*)"])
    // res.send('Hello World!!!')
}

export const saveTask = async (req, res) => {
    const connection =  await connect();
    const result = await connection.query("INSERT INTO tasks(title, description) VALUES (?,?)",[
        req.body.title,
        req.body.description
    ])

    res.json({
        id: result.insertId,
        ...req.body
    })
    // console.log(result)
    // res.send('Hello World!!!')
}

export const deleteTask = async (req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM tasks WHERE id = ?",[
        req.params.id
    ]);
    res.sendStatus(204);
    // console.log(result);
    // res.json({})
    // res.send('Hello World!!!')
}

export const updateTask = async (req, res) => {
    // res.send('Hello World!!!')
    const connection = await connect();
    await connection.query('UPDATE tasks SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ])
    // console.log(results)
    res.sendStatus(204)
}
