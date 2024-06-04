import { split } from "postcss/lib/list";


export default function toJson({ title, head, item1, item1Row, item2Desc, item2Col, item2Row, item3Desc, item3Col, item3Row, item4Desc }) {
    console.log(item1);
    function item1Fn(item1) {
        const rows = item1.replace(/\n$/, '').split('\n');
        return rows.map((row) => {
            const splited = row.split(':');
            const itemName = splited[0];
            const selection = splited.slice(1);
            return {
                itemName: itemName,
                uuid: crypto.randomUUID(),
                selection: selection[0].split(','), answer: 0
            }
        });
    }

    function item2ColFn(item2) {
        const cols = item2.split(',');
        return cols.map((col, idx) => {
            if (idx === 0) {
                return { str: col, colspan: 2 };
            }
            else {
                return { str: col, colspan: 1 };
            }
        })
    }

    function item2RowFn(item2Row) {
        const items = item2Row.replace(/\n+\s*$/, '').split(/\s*\n\n+\s*/);
        console.log('items', items);
        const obj = items.map((item) => {
            const rows = item.split('\n');
            return {
                rowHead: rows[0],
                rowspan: rows.length - 1,
                secondRow: rows.slice(1).map((item) => (
                    { str: item, choice: 0, uuid: crypto.randomUUID() }
                )),
                common: [1, 2, 3, 4, 5]
            }
        })
        return obj;
    }

    function item3ColFn(item3Col) {
        const cols = item3Col.replace(/\s*\n+\s*$/, '').split('\n');
        const common = [1, 2, 3, 4, 5];
        return cols.map((col, idx) => {
            if (idx === 0)
                return { str: col, colspan: 1, uuid: crypto.randomUUID(), common: common };
            else
                return { str: col, colspan: common.length, uuid: crypto.randomUUID(), common: common };
        })
    }

    function item3RowFn(item3Row) {
        const rows = item3Row.replace(/\n+$/, '').split('\n');
        return rows.map((row) => {
            return { str: row, choice: [], uuid: crypto.randomUUID() }
        })
    }

    return {
        title: title,
        head: head,
        item1Row: item1Row,
        item1: item1Fn(item1),
        item2Desc: item2Desc,
        item2Col: item2ColFn(item2Col),
        item2Row: item2RowFn(item2Row),
        item3Desc: item3Desc,
        item3Col: item3ColFn(item3Col),
        item3Row: item3RowFn(item3Row),
        item4Desc: item4Desc,
        item4Input: { type: 'input', text: '' },
    }
}
