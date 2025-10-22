import {getMonoracleData} from '../dist'
const CONTRACT_ADDRESS = '0xc3633482b735BDB78E2a8112EF7a4434F4A20024';
(async() => {
    const response = await getMonoracleData(CONTRACT_ADDRESS)
    console.log(response)
})()