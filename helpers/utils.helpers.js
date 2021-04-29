
/*
* Created Date: Thursday, April 29th 2021
* Author: Miguel Pardal
* Email: mpardalm.developer@gmail.com
* Alias: mpardalm
* -----
*/
const fs = require('fs');
const { request, response } = require("express");

const asyncRedis = require('async-redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const dbPath = './db/database.json';

const checkBody = async (req = request) => {
    const { count } = req.body;
    if (count && !isNaN(count)) {
        const redisCurrentValue = await getRedisCount();
        await updateRedisCount(redisCurrentValue, count);
    }
}

const getRedisCount = async () => {
    const client = asyncRedis.createClient(REDIS_PORT);
    try {
        const value = await client.get('count');
        return isNaN(value) ? 0 : value;
    } catch (error) {
    }
}

const updateRedisCount = async (redisCurrentValue, count) => {
    const client = asyncRedis.createClient(REDIS_PORT);
    try {
        const valueUpdated = parseFloat(redisCurrentValue) + parseFloat(count);
        await client.set('count', valueUpdated);
    } catch (error) {
    }
}

const saveJSONFile = (req = request, res = response) => {
    try {
        const currentValues = readJSONFile();
        currentValues.push(req.body);
        const payload = {
            values: currentValues
        }
        fs.writeFileSync(dbPath, JSON.stringify(payload));
        return res.status(201).json({
            created: true
        });
    } catch (error) {
        return res.status(500).json({
            created: false
        });
    }
}

const readJSONFile = () => {
    if (fs.existsSync(dbPath)) {
        const info = fs.readFileSync(dbPath, { encoding: 'utf-8' });
        if (info) {
            const data = JSON.parse(info);
            return data.values;
        }
        return [];
    } else {
        if (!fs.existsSync('./db')) {
            fs.mkdirSync('./db');
        }
        fs.writeFileSync(dbPath, '{values:[]}');
        return [];
    }
}

module.exports = {
    checkBody,
    getRedisCount,
    saveJSONFile
}