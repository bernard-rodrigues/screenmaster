const reducer1 = 0.5
let reducer2 = 0.9

// Converts from inches to centimeters
function convertToCentimeter(value) {
    return 2.54 * value
}

// Calculates screen's height, width and area based on it's inches and aspect ratio
function screenMaker(inches, prop_w = 16.0, prop_h = 9.0) {
    const tg = prop_h / prop_w

    const theta = Math.atan(tg)

    const measures = {
        h: convertToCentimeter(inches * Math.sin(theta)),
        w: convertToCentimeter(inches * Math.cos(theta)),
        a: convertToCentimeter(inches * Math.sin(theta)) * convertToCentimeter(inches * Math.cos(theta))
    }

    return measures
}

// Updates screen's shape
function screenUpdate() {
    measures1 = screenMaker($('#inches1').val(), $('#ratio1').val().split(':')[0], $('#ratio1').val().split(':')[1])
    measures2 = screenMaker($('#inches2').val(), $('#ratio2').val().split(':')[0], $('#ratio2').val().split(':')[1])

    if($('#ratio1').val().split(':')[1] > 10 && $('#ratio2').val().split(':')[1] > 10) {
        control = reducer1 * ($(document.body).height() / (measures1.h + measures2.h))
    }else{
        control = reducer1 * ($(document.body).width() / (measures1.w + measures2.w))
    }

    if($(document.body).width() <= 768){
        control = control * 2
    }

    $('#screen-1').height(measures1.h * control)
    $('#screen-1').width(measures1.w * control)
    $('#screen-2').height(measures2.h * control)
    $('#screen-2').width(measures2.w * control)

    $('#width-info-1').text('Width: ' + measures1.w.toFixed(2) + ' cm (' + (measures1.w / 2.54).toFixed(2) + ' in)')
    $('#height-info-1').text('Height: ' + measures1.h.toFixed(2) + ' cm (' + (measures1.h / 2.54).toFixed(2) + ' in)')
    $('#area-info-1').text('Area: ' + (measures1.a).toFixed(2) + 'cm² (' + ((measures1.a) / Math.pow(2.54, 2)).toFixed(2) + ' in²)')

    $('#width-info-2').text('Width: ' + measures2.w.toFixed(2) + ' cm (' + (measures2.w / 2.54).toFixed(2) + ' in)')
    $('#height-info-2').text('Height: ' + measures2.h.toFixed(2) + ' cm (' + (measures2.h / 2.54).toFixed(2) + ' in)')
    $('#area-info-2').text('Area: ' + (measures2.a).toFixed(2) + 'cm² (' + ((measures2.a) / Math.pow(2.54, 2)).toFixed(2) + ' in²)')


    const screen1area = measures1.w * measures1.h
    const screen2area = measures2.w * measures2.h

    if(screen1area == screen2area) {
        $('#screen-3').height((measures1.h * control) * reducer2)
        $('#screen-3').width((measures1.w * control) * reducer2)
        $('#screen-4').height((measures2.h * control) * reducer2)
        $('#screen-4').width((measures2.w * control) * reducer2)
        $('#bigger-1').text('')
        $('#bigger-2').text('')
        $('#screen-4').css('opacity', '0')
    }else if (screen1area > screen2area) {
        $('#screen-3').height((measures1.h * control) * reducer2)
        $('#screen-3').width((measures1.w * control) * reducer2)
        $('#screen-4').height((measures2.h * control) * reducer2)
        $('#screen-4').width((measures2.w * control) * reducer2)
        $('#bigger-1').text('Display 1 is ' + ((measures1.a / measures2.a - 1) * 100).toFixed(2) + '% bigger than Display 2').css('opacity', '1')
        $('#bigger-2').css('opacity', '0')
        $('#screen-4').css('opacity', '1')
    } else if (screen1area < screen2area) {
        $('#screen-3').height((measures2.h * control) * reducer2)
        $('#screen-3').width((measures2.w * control) * reducer2)
        $('#screen-4').height((measures1.h * control) * reducer2)
        $('#screen-4').width((measures1.w * control) * reducer2)
        $('#bigger-2').text('Display 2 is ' + ((measures2.a / measures1.a - 1) * 100).toFixed(2) + '% bigger than Display 1').css('opacity', '1')
        $('#bigger-1').css('opacity', '0')
        $('#screen-4').css('opacity', '1')
    }

    if (measures1.h > measures1.w) {
        $('#bar1').hide()
        $('#foot1').hide()
    } else {
        $('#bar1').show()
        $('#foot1').show()
    }

    if (measures2.h > measures2.w) {
        $('#bar2').hide()
        $('#foot2').hide()
    } else {
        $('#bar2').show()
        $('#foot2').show()
    }
}

// Updates screen's shapes on document loading
$(document).ready(function () {
    screenUpdate()
})

$('#ratio1').change(function () {
    if($('#ratio1').val().split(':')[1] > 10 && $('#inches1').val() > 10){
        $('#inches1').val('6.7')
    }else if($('#ratio1').val().split(':')[1] < 10 && $('#inches1').val() < 10){
        $('#inches1').val('19.5')
    }
    screenUpdate()
})

$('#ratio2').change(function () {
    if($('#ratio2').val().split(':')[1] > 10 && $('#inches2').val() > 10){
        $('#inches2').val('6.7')
    }else if($('#ratio2').val().split(':')[1] < 10 && $('#inches2').val() < 10){
        $('#inches2').val('19.5')
    }
    screenUpdate()
})

$('#inches1').change(function () {
    screenUpdate()
})

$('#inches2').change(function () {
    screenUpdate()
})