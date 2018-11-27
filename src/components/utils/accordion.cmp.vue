<template>
        <collapse :selected="true">
            <div slot="collapse-header">
                {{header}}
            </div>
            <div slot="collapse-body">
                <button>Hello
                </button>
            </div>
        </collapse>
</template>
 
<script>
 
import Collapse from 'vue-collapse'
export default {
    props:['header', 'body'],
    name: "accordion",
    components: {
        Collapse
    }
}
</script>