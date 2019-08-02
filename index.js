let support = [
    {display : 's=vt', id : ['s', 'v', 't'], calc : 0},
    {display : '2as=v^2-v\'^2', id : ['a', 's', 'v', 'v\''], calc : 2},
    {display : 's=vt+1/2at^2', id : ['s', 'v', 't', 'a', 't'], calc : 3},
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
                result.push(v(1) * v(2))
            } else if (req[0] === 1) {
                result.push(v(0) / v(2))
            } else {
                result.push(v(0) / v(1))
            }
        } else if (type === 1) {
            if (req[0] === 0) {
                result.push((v(1) * v(2)).toString() + 'g')
            } else if (req[0] === 1) {
                result.push(v(0) / v(2))
            } else {
                result.push(v(0) / v(1))
            }
        } else if (type === 2) {
            if (req[0] === 0) {
                result.push((v(2) ** 2 - v(3)**2) / (2 * v(1)))
            } else if (req[0] === 1) {
                result.push((v(2) ** 2 - v(3)**2) / (2 * v(0)))
            } else if (req[0] === 2) {
                result.push((2 * v(0) * v(1) + v(3)) ** (1/2))
            } else {
                calced = (-1 * (2 * v(0) * v(1) - v(2))) ** (1/2)
                if (isNaN(calced)) {
                    result.push('존재하지 않음')
                } else {
                    result.push(calced)
                }
            }
        } else if (type === 3) {
            if (req[0] === 0) {
                result.push(((v(1) * v(2)) + (v(3) * v(4)) / 2))
            } else if (req[0] === 1) {
                result.push((v(0) - (v(3) * v(4))/2)) / v(2)
            } else if (req[0] === 2) {
                result.push((v(0) - (v(3) * v(4))/2)) / v(3)
            } else if (req[0] === 3) {
                result.push((2 * (v(0) - v(1) * v(2))) / v(4)**2)
            } else {
                result.push((2 * (v(0) - v(1) * v(2))) / v(3)**1/2)
            }
        } else if (type === 4) {
            if (req[0] === 0) {
                result.push((v(1) + v(2))/2)
            } else if (req[0] === 1) {
                result.push(2*(v(0) - v(2)))
            } else {
                result.push(2*(v(0) - v(1)))
            }
        }
        document.getElementById('tag').innerHTML = renderResultTag(result[0], result[1], 'success')
    }
}

function renderResultTag (first, second, color) {
    return '<div class="control"><div class="tags has-addons"><span class="tag">' + first + '</span><span class="tag is-' + color + '">' + second + '</span></div></div>'
}

function v (id) {
    return Number(document.getElementById('inp'+id).value)
}
