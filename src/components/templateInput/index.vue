<template>
    <div>
        <template v-for="(item, $index) in inputTexts"
                  track-by="$index">
            <template v-if="$index !== inputTexts.length - 1">
                {{item}}
                <span class="pdboth5">
                <input name=""
                       type="text"
                       :disabled="componentData.disabledArr ? componentData.disabledArr[$index] : false"
                       class="form-control mini"
                       v-model="componentData.inputValue[$index]">
            </span>
            </template>
            <template v-else>
                {{item}}
            </template>
        </template>
    </div>
</template>
<style></style>
<script>
    export default{
        props: ['componentData'],
        data: function () {
            return {
                inputValue: []
            }
        },
        computed: {
            inputTexts: function () {
                return this.componentData.template.split('%i')
            }
        }
    }
</script>
