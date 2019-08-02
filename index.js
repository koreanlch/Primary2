let support = [
    {display : 's=vt', id : ['s', 'v', 't'], calc : 0},
    {display : '2as=v^2-v^2.', id : ['w', 'a', 's', 'v', 'v.'], calc : 2},
    {display : 's=vt+1/2at', id : ['s', 'v', 't', 'a', 't'], calc : 3},
    {display : '평균 속도', id : ['v평', 'v0', 'v'], calc : 4},
    {display : 'F=ma', id : ['F', 'm', 'a'], calc : 0},
    {display : 'I=Ft', id : ['I', 'F', 't'], calc : 0},
    {display : 'P=mv', id : ['P', 'm', 'v'], calc : 0},
    {display : 'W=Fs', id : ['W', 'F', 's'], calc : 0},
    {display : 'Ep=mgh', id : ['Ep', 'm', 'h'], calc : 1},
]

var selecterInnerHTML = ''
for (i = 0; i < support.length; i++) {
    selecterInnerHTML += '<a class="button" id="' + support[i]['id'] + '" onclick="displayPcalc(' + support[i]['calc'] + ', ' + i + ')">' + support[i]['display'] + '</a>'
}
document.getElementById('selecter').innerHTML = selecterInnerHTML

function displayPcalc (type, index) {
    inputInnerHTML = ''
    for (i=0; i < support[index]['id'].length; i++) {
        inputInnerHTML += '<div class="field"><div class="control"><input class="input" id="inp' + i + '" type="number" placeholder="' + support[index]['id'][i] + '" onchange="inputPcalc(' + type + ', ' + index + ')" value=""></input></div></div>'
    }
    document.getElementById('inputs').innerHTML = inputInnerHTML
}

function inputPcalc (type, index) {  //id, type
    //ele = document.getElementById(id)
    finder = []
    req = []
    result = []
    for (j=0; j < support[index]['id'].length; j++) {
        if (document.getElementById('inp' + j).value !== ''){
            finder.push(true)
        } else {
            finder.push(false)
            req.push(j)
        }
    }
    if (req.length === 1) {
        result.push(support[index]['id'][req[0]])
        if (type === 0) {
            if (req[0] === 0) {
                result.push(Number(document.getElementById('inp1').value) * Number(document.getElementById('inp2').value))
            } else if (req[0] === 1) {
                result.push(Number(document.getElementById('inp0').value) / Number(document.getElementById('inp2').value))
            } else {
                result.push(Number(document.getElementById('inp0').value) / Number(document.getElementById('inp1').value))
            }
        } else if (type === 1) {
            if (req[0] === 0) {
                result.push((Number(document.getElementById('inp1').value) * Number(document.getElementById('inp2').value)).toString() + 'g')
            } else if (req[0] === 1) {
                result.push(Number(document.getElementById('inp0').value) / Number(document.getElementById('inp2').value))
            } else {
                result.push(Number(document.getElementById('inp0').value) / Number(document.getElementById('inp1').value))
            }
        } else if (type === 2) {
        } else if (type === 3) {
        } else if (type === 4) {
            if (req[0] === 0) {
                result.push((Number(document.getElementById('inp1').value) + Number(document.getElementById('inp2').value))/2)
            } else if (req[0] === 1) {
                result.push(2*(Number(document.getElementById('inp0').value) - Number(document.getElementById('inp2').value)))
            } else {
                result.push(2*(Number(document.getElementById('inp0').value) - Number(document.getElementById('inp1').value)))
            }
        } else {
        }
        document.getElementById('tag').innerHTML = renderResultTag(result[0], result[1], 'success')
    }
}

function renderResultTag (first, second, color) {
    return '<div class="control"><div class="tags has-addons"><span class="tag">' + first + '</span><span class="tag is-' + color + '">' + second + '</span></div></div>'
}