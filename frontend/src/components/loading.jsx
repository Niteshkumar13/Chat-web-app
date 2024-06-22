import React from 'react';
import '../cssFile/loading.css';
const Loading = () => {
    return (
        <div>
            <div class="containers-for-loading">
                <div class="post">
                    <div class="line a"></div>
                    <div class="line b"></div>
                </div>
                <div class="post" style={{display:'grid',direction : 'rtl'}}>
                    <div class="line a"></div>
                    <div class="line b"></div>    
                </div>
                <div class="post">
                    <div  class="line a"></div>
                    <div  class="line b"></div>
                </div>
                <div class="post" style={{display:'grid',direction : 'rtl'}}>
                    <div class="line a"></div>
                    <div class="line b"></div>    
                </div>
                <div class="post">
                    <div class="line a"></div>
                    <div class="line b"></div>
                </div>
                <div class="post" style={{display:'grid',direction : 'rtl'}}>
                    <div class="line a"></div>
                    <div class="line b"></div>    
                </div>
            </div>
        </div>
    )
}

export default Loading;
