<template>
    <!-- <header> -->
        <div class="logo">
            <img alt="Vue logo" src="https://vuejs.org/images/logo.png" />
        </div>
        <div class="navbar">
            <input type="checkbox" name="openNav" id="openNav">
            <label for="openNav" class="openNav">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <ul class="menu">
                <li>HOME</li>
                <li>Clothins
                    <label>
                        <input type="checkbox">
                        <i class="fa-solid fa-angle-down"></i>
                    </label>
                    <ul>
                        <li>All clothings</li>
                        <li>Shirts
                            <label>
                                <input type="checkbox">
                                <i class="fa-solid fa-angle-down"></i>
                            </label>
        
                            <ul>
                                <li>T-Shirts</li>
                                <li>Hoodie</li>
                                <li>Sweatershirt</li>
                            </ul>
                        </li>
                        <li>Shorts</li>
                        <li>Caps</li>
                        <li>Socks</li>
                    </ul>
                </li>
                <li>News</li>
                <li>Sports</li>
            </ul>
            <ul class="other-option">
                <li>Sign in</li>
                <li>Sign up</li>
            </ul>
        </div>
    <!-- </header> -->
</template>
<style>
/* header {
    display: flex;
    width: 80%;
    margin: 0 10%;
} */
.logo {
    width: 15%;
}
.logo img {
    width: 60px;
    padding: 10px;
}
.navbar {
    width: 85%;
    color: #eee;
    display: flex;
    justify-content: right;
}
.navbar ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: inline-block;
}
.navbar .other-option {
    width: 35%;
    text-align: right
}
.navbar .menu {
    width: 65%;
    text-align: center;
}
.navbar li {
    padding: 30px;
    display: inline-block;
    transition: .5s;
    position: relative;
}
.navbar li:hover {
    background-color: #5bb299 !important;
}
.navbar .menu li ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 250px;
    margin: 0;
    padding: 0;
    background-color: #ffffff22;
    text-align: left;
    display: none;
}
.navbar li:hover > ul {
    display: block;
}
.navbar .menu ul li {
    /* width: calc(100% - 60px); */
    text-align: left;
    display: block;
}
.navbar .menu ul ul {
    left: 100%;
    top: 0;
}
.navbar input {
    display: none;
}
@media only screen and (max-width: 767px) {
    .logo {
        position: absolute;
        right: 0;
        top: 0;
    }
    .logo img {
        width: 45px;
    }
    .navbar {
        position: fixed;
        width: 60vw;
        background-color: #3d5060;
        top: 0;
        left: 0;
        height: 100vh;
        display: block;
        transition: 0.5s;
        transform: translate(-100%, 0);
    }
    .navbar .openNav {
        display: block;
        position: absolute;
        left: 100%;
        top: 0;
        width: 50px;
        height: 50px;
        background-color: #ffffff77;
        padding: 10px;
    }
    .navbar .openNav span {
        display: block;
        background-color: #000;
        width: 30px;
        height: 3px;
        margin: 5px 0;
        transition: 1s;
    }
    .navbar:has(input[name="openNav"]:checked) {
        transform: translate(0, 0);
    }
    .navbar:has(input[name="openNav"]:checked) .openNav span:nth-child(2) {
        opacity: 0;
        transition: 0s;
    }
    .navbar:has(input[name="openNav"]:checked) .openNav span:nth-child(1) {
       transform: rotate(45deg) translate(6px, 5px);
    }
    .navbar:has(input[name="openNav"]:checked) .openNav span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -5px);
    }
    .navbar input {
        display: none;
    }
    .navbar li{
        display: block;
        position: unset;
        border-bottom: 2px solid #384857;
        font-weight: 500;
    }
    .navbar .other-option,
    .navbar .menu {
        width: 100%;
        text-align: left;
    }
    .navbar .menu li:hover {
        background-color: unset!important;
        border-left: 10px solid #5bb299;
    }
    .navbar .menu label {
        display: block;
        float: right;
    }
    .navbar .menu label i {
        display: block;
        transition: .5s;
        margin-right: 0;
    }
    .navbar label:has(input:checked) ~ ul {
        max-height: 50vh;;
    }
    .navbar .menu li ul{
        width: 100%;
        max-height: 0;
        position: unset;
        background-color: unset;
        display: block;
        overflow: hidden;
        transition:1.5s;
        opacity: 1;
        border-left: 1px solid #ffffff22;
    }
    .navbar li li:hover {
        border-left: unset!important;
    }
    .navbar li li{
        border-bottom: 0;
        padding:10px 10px 10px 50px;
        position: relative;
        color: #7f91a1;;
    }
    .navbar li li::before{
        position: absolute;
        top: 20px;
        left: 0;
        width: 30px;
        height: 100%;
        content: '';
        border-top: 1px solid #ffffff22;
    }
    .navbar li li::after {
        position: absolute;
        top: 18px;
        left: 30px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        content: '';
        background: #ffffff22;
    }
    .navbar label input:checked ~ i {
        transform: rotate(180deg);
    }
}
</style>