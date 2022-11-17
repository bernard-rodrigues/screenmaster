const reducer1 = 0.5
const reducer2 = 0.75

function convertToCentimeter(value){
    return 2.54 * value
}

function screenMaker(inches, prop_w=16.0, prop_h=9.0){
    const tg = prop_h/prop_w

    const theta = Math.atan(tg)

    const measures = {
        h: convertToCentimeter(inches * Math.sin(theta)),
        w: convertToCentimeter(inches * Math.cos(theta)),
        a: convertToCentimeter(inches * Math.sin(theta)) * convertToCentimeter(inches * Math.cos(theta))
    }

    return measures
}

function screenUpdate(){
    measures1 = screenMaker($('#inches1').val(), $('#width1').val(), $('#height1').val())
    measures2 = screenMaker($('#inches2').val(), $('#width2').val(), $('#height2').val())
    
    const control = reducer1*($(document.body).width() / (measures1.w + measures2.w))

    $('#screen-1').height(measures1.h * control)
    $('#screen-1').width(measures1.w * control)
    $('#screen-2').height(measures2.h * control)
    $('#screen-2').width(measures2.w * control)

    $('#width-info-1').text('Width: ' + measures1.w.toFixed(2) + ' cm (' + (measures1.w/2.54).toFixed(2) + ' in)')
    $('#height-info-1').text('Height: ' + measures1.h.toFixed(2) + ' cm (' + (measures1.h/2.54).toFixed(2) + ' in)')
    $('#area-info-1').text('Area: ' + (measures1.a).toFixed(2) + 'cm² (' + ((measures1.a)/Math.pow(2.54,2)).toFixed(2) + ' in²)')

    $('#width-info-2').text('Width: ' + measures2.w.toFixed(2) + ' cm (' + (measures2.w/2.54).toFixed(2) + ' in)')
    $('#height-info-2').text('Height: ' + measures2.h.toFixed(2) + ' cm (' + (measures2.h/2.54).toFixed(2) + ' in)')
    $('#area-info-2').text('Area: ' + (measures2.a).toFixed(2) + 'cm² (' + ((measures2.a)/Math.pow(2.54,2)).toFixed(2) + ' in²)')


    const screen1area = measures1.w * measures1.h
    const screen2area = measures2.w * measures2.h
    
    if(screen1area > screen2area){
        console.log('1')
        $('#screen-3').height((measures1.h * control)*reducer2)
        $('#screen-3').width((measures1.w * control)*reducer2)
        $('#screen-4').height((measures2.h * control)*reducer2)
        $('#screen-4').width((measures2.w * control)*reducer2)
        $('#bigger-1').text('Display 1 is ' + ((1 - measures2.a/measures1.a)*100).toFixed(2) + '% bigger than Display 2').show()
        $('#bigger-2').hide()
    }else if(screen1area < screen2area){
        console.log('2')
        $('#screen-3').height((measures2.h * control)*reducer2)
        $('#screen-3').width((measures2.w * control)*reducer2)
        $('#screen-4').height((measures1.h * control)*reducer2)
        $('#screen-4').width((measures1.w * control)*reducer2)
        $('#bigger-2').text('Display 2 is ' + ((1 - measures1.a/measures2.a)*100).toFixed(2) + '% bigger than Display 1').show()
        $('#bigger-1').hide()
    }

    if(measures1.h > measures1.w){
        $('#bar1').hide()
        $('#foot1').hide()
    } else{
        $('#bar1').show()
        $('#foot1').show()
    }

    if(measures2.h > measures2.w){
        $('#bar2').hide()
        $('#foot2').hide()
    } else{
        $('#bar2').show()
        $('#foot2').show()
    }
}

$(document).ready(function(){
    screenUpdate()
})

$('#width1').change(function(){
    screenUpdate()
})

$('#height1').change(function(){
    screenUpdate()
})

$('#inches1').change(function(){
    screenUpdate()
})

$('#width2').change(function(){
    screenUpdate()
})

$('#height2').change(function(){
    screenUpdate()
})

$('#inches2').change(function(){
    screenUpdate()
})