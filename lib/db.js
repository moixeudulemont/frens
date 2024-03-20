import { connect } from 'mongoose';

export async function db() {
    try {
        await connect(process.env.MONGODB_URI);
        console.log('Base de datos conectada');
    } catch (err) {
        console.log(err);
    }
}
