
//info: {hour: 0, minute: 0, second: 0}
export default function ShowTime({ preStr, second, postStr }) {
    const hour = Math.floor(second / 3600);
    const minute = Math.floor((second % 3600) / 60);
    const sec = second % 60;

    if (second) {
        const ps = preStr ? preStr + ': ' : '';

        const s =  ps + hour + '시간 ' + minute + '분 ' + sec + '초 ';
        return (
            <div className='m-2'>
                <p> {s}</p>
            </div>
        );
    } else {
        <div> </div>
    }
}