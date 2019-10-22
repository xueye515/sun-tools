const join = require('path').join;
var fs = require('fs');

function generate(program, { cwd }) {

    const defaultBase = 'src';
    const base = program.base || defaultBase;
    const defaultEntry = `${base}/index.js`;
    const defaultRouter = `${base}/router.js`;

    const [namespace,] = cwd;

    try {
        const src = join(__dirname, `\\demo`)
        debugger;
        copy(src, namespace)

    } catch (e) {
        error(e.stack);
    }
}



var copy = function (src, namespace) {
    // 读取目录中的所有文件/目录
    var dst = './' + namespace;
    fs.access("./src/pages", function (err) {
        if (!err) {
            dst = './src/pages/' + namespace;
        }
    });
    fs.access("./pages", function (err) {
        if (!err) {
            dst = './pages/' + namespace;
        }
    })

    fs.access(dst, function (err) {
        if (err) {
            fs.mkdir(dst, () => { })
        }
    })

    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable,
                opts = {
                    encoding: 'utf8',
                }
            fs.stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    var source = fs.readFileSync(_src, 'utf-8');
                    if (namespace && _src.endsWith('.ts') || _src.endsWith('.tsx')) {
                        source = source.toString().replace(new RegExp('Demo', "gm"), namespace);
                    }
                    fs.writeFile(_dst, source, opts, () => { });
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};

module.exports = {
    init: generate
}