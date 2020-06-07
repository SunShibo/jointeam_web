var storage = {
    set: function(key, value) {
        console.log('set', key, value)
        if (value === undefined || value === null) {
            localStorage.setItem(key, null)
            return
        }
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            localStorage.setItem(key, JSON.stringify({
                _type: typeof value,
                value: value
            }))
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    },
    get: function(key, defaultValue) {
        // console.log('storage get ' + key)
        var item = localStorage.getItem(key)
        if (item === null) {
            return defaultValue || null
        }
        var ret = JSON.parse(item)
        if (ret && typeof ret === 'object') {
            if (ret._type === 'string' || ret._type === 'number' || ret._type === 'boolean') {
                return ret.value
            }
        }
        return ret
    },
    setItem: function(key, value) {
        this.set(key, value)
        return this
    },
    getItem: function(key) {
        return this.get(key)
    }
}

function Client(data) {
    console.log('Client-------', data)
    //后端提供数据
    return new OSS({
        region: data.region,  //oss-cn-beijing-internal.aliyuncs.com
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        stsToken: data.stsToken,
        bucket: data.bucket
    })
}
