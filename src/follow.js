document.querySelector('#loginBtn').addEventListener("click",(e)=>login(e))
        async function login(e) {
            console.log('로그인함수실행됨')
            const url = "https://api.mandarin.cf"
            const myToken = localStorage.getItem('accessToken')
            try {
                const res = await fetch(url+'/user/login', {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify( {
                        user:{
                                email: document.querySelector("#loginId").value,
                                password: document.querySelector("#loginPw").value
                            }
                        })
                });
                const result = await res.json();
                console.log('로그인 완료 서버응답',result);
                console.log(result.user.token);
                localStorage.setItem('token',result.user.token)
            } catch (error) {
                console.log(res);
                alert('오류발생,존재하지 않는 사용자입니다.');
            }
            ///user/login
        }

document.querySelector("#followBtn").addEventListener("click",(e)=>follow(e))
async function follow(e) {
    console.log('팔로우함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('token')
    let Id = document.querySelector("#nameinput").value;
    console.log('입력한 사용자명',Id);
    try {
        const res = await fetch(url+`/profile/`+Id+`/follow`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log('팔로우 완료 서버응답',result);
    } catch (error) {
        console.log(res);
        console.log('오류발생,존재하지 않는 사용자입니다.');
    }
}

document.querySelector("#unfollowBtn").addEventListener("click",(e)=>unfollow(e))
async function unfollow(e) {
    console.log('언팔로우함수실행됨')
    const url = "https://api.mandarin.cf"
    const myToken = localStorage.getItem('token')
    let Id = document.querySelector("#nameinput").value;
    try {
        const res = await fetch(url+`/profile/`+Id+`/unfollow`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${myToken}`,
                "Content-type" : "application/json"
            }
    
        });
        const result = await res.json();
        console.log('언팔완료 서버응답',result);
        
    } catch (error) {
        console.log(res);
        console.log('오류발생,존재하지 않는 사용자입니다..');
    }
}