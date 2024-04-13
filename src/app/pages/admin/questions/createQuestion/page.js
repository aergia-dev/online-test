'use client'

function showPreview(content) {

}

function preview(content) {

}
function makeQuestion(content) {

}

function parsing(content) {
    const trimed = content.trim();
    const splited = trimed.split("\n");
    console.log(splited);
}

function makePreview(content) {

    //split by empty line
    // first ele is question
    // second
    //split with eol
    //it is selection
    const aa = parsing(content);
}

export default function CreateQuestion() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value)}>
                    converting
                </button>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="rawQuestion" rows="20" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <div name="right-half w-1/2">
                        <div>
                            priview
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}