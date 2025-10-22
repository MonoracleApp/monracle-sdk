import {getMonoracleData} from '../dist'
const CONTRACT_ADDRESS = '0xc3633482b735BDB78E2a8112EF7a4434F4A20024';

interface ResponseProps {
    userId: number
    id: number
    title: string
    body: string
}

(async() => {
    const response = await getMonoracleData<ResponseProps[]>(CONTRACT_ADDRESS)
    console.log(response)
})()