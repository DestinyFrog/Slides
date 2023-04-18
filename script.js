
var screen_position = 0;
var current_slide = 1;
var last_slide = 1;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

async function define() {
    await fetch( "data.json" )
    .then( response => response.json() )
    .then( function( data ) {
        last_slide = data["slides"].length;

        data["slides"].forEach( ( { style, content } ) => {
            document.body.innerHTML += `
            <div class="slide">
                <div class="container" style="${style}">
                    ${content || "" }
                </div>
            </div>`;
        } );

    } );
} define();

document.addEventListener( 'keydown',
    event => {
        if( event.key == "ArrowDown" ) {
            if( current_slide >= last_slide ) { return; }
            current_slide += 1;
            screen_position -= vh;
        }else if( event.key == "ArrowUp" )   {
            if( current_slide <= 1 ) { return; }
            screen_position += vh;
            current_slide -= 1;
        }

        document.body.style.transform = "rotateZ( 1turn )";
        document.body.style.transform = `translateY( ${screen_position}px )`;
    }
);