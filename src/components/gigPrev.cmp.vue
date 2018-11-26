<template>
    <li>
        <img src="https://fiverr-res.cloudinary.com/w_iw_div_3.0,q_auto,f_auto/general_assets/categories/assets/f3/desktop_writing_and_translation_business_names_slogans.jpg">
        <div>
            <h3> {{gig.details.title}} </h3>
            <p> {{gig.details.desc}} </p>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        gig:Object
    }

}
</script>

<style lang="scss">

</style>