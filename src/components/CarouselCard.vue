<template>
    <div class="wrapper">
        <div class="card">
            <h2>Card 1</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusamus illum incidunt praesentium magni consepquatur odio, in teneturea doloribus commodi, fugit sequi qui psa similique!</p>
        </div>
        <div class="card">
            <h2>Card 2</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusamus illum incidunt praesentium magni consepquatur odio, in teneturea doloribus commodi, fugit sequi qui psa similique!</p>
        </div>
        <div class="card">
            <h2>Card 3</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusamus illum incidunt praesentium magni consepquatur odio, in teneturea doloribus commodi, fugit sequi qui psa similique!</p>
        </div>
        <div class="card">
            <h2>Card 4</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusamus illum incidunt praesentium magni consepquatur odio, in teneturea doloribus commodi, fugit sequi qui psa similique!</p>
        </div>
        <div class="card">
            <h2>Card 5</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Accusamus illum incidunt praesentium magni consepquatur odio, in teneturea doloribus commodi, fugit sequi qui psa similique!</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
.wrapper {
    display: flex;
    gap: 20px;
    width: 300px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

.card {
    scroll-snap-align: center;
    padding: 20px 30px;
    flex-shrink: 0;
    width:300px;
    background-color: #fff;
    border-radius: 14px;
    text-align: center
}
</style>