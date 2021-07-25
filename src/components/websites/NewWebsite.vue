<template>
  <q-menu>
    <q-list style="min-width: 130px">
      <q-item dense clickable v-close-popup v-on:click="open()">
        <q-item-section>New Empty Website</q-item-section>
      </q-item>
      <q-separator />
      <q-item dense clickable v-close-popup v-on:click="open(NewWebsiteTypeEnum.Personal)">
        <q-item-section>New Personal Website</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="far fa-id-card" /></q-item-section>
      </q-item>
      <q-separator />
      <q-item dense clickable v-close-popup v-on:click="open(NewWebsiteTypeEnum.Lab)">
        <q-item-section>New Research Lab Website</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="fas fa-vial" /></q-item-section>
      </q-item>
      <q-separator />
      <q-item dense clickable v-close-popup v-on:click="open(NewWebsiteTypeEnum.Course)">
        <q-item-section>New Course Website</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="fas fa-chalkboard-teacher" /></q-item-section>
      </q-item>
      <q-separator />
      <q-item dense clickable v-close-popup v-on:click="open(NewWebsiteTypeEnum.Conference)" >
        <q-item-section>New Conference/Workshop Website</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="far fa-calendar-alt" /></q-item-section>
      </q-item>
      <q-separator />
      <!--<q-item dense clickable v-close-popup>-->
      <q-item dense disable>
        <q-item-section>Import from Git Repository</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="fab fa-git-alt" /></q-item-section>
      </q-item>
      <q-separator />
      <q-item dense clickable v-close-popup v-on:click="onImportWebsiteClick()">
        <q-item-section>Import from Zip File</q-item-section>
        <q-item-section side><q-icon size="xs" color="grey-6" name="far fa-file-archive" /></q-item-section>
      </q-item>
    </q-list>
  </q-menu>
  <q-dialog
    v-model="showCopy"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create New Website</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="title"
          autofocus
          v-on:keyup.enter="onCreateWebsiteClick()"
          label="Title"
          :error-message="errors.has('title') ? errors.get('title') : ''"
          :error="errors.has('title')"
          v-on:keydown="errors.clear('title')"
        />
      </q-card-section>

      <!--
      <q-card-section class="q-pt-none">
        <q-input dense v-model="id" autofocus label="ID (auto-generated)" disable />
      </q-card-section>
      -->

      <!-- TODO: Git options will be added here (Credentials, Repository selection)  -->

      <q-card-section class="q-pt-none">
        <q-select
          label="Theme"
          hint="* Can be changed later"
          v-model="themeValue"
          :options="themeOptions"
          :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
          :option-label="opt => Object(opt) === opt && 'label' in opt ? opt.label : '- Null -'"
        >
          <!--<template v-slot:option="scope">-->
          <!--  <q-item-->
          <!--    v-bind="scope.itemProps"-->
          <!--  >-->
          <!--    <q-item-section>-->
          <!--      <q-item-label v-html="scope.opt.label" />-->
          <!--      <q-item-label caption>{{ scope.opt.description }}</q-item-label>-->
          <!--    </q-item-section>-->
          <!--  </q-item>-->
          <!--</template>-->
        </q-select>
      </q-card-section>

      <!--<q-card-section class="q-pt-none">-->
      <div v-if="websiteType !== NewWebsiteTypeEnum.Empty">
        <q-banner inline-actions class="bg-grey-3">
          You are about to create a new <i>{{ newWebsiteTypeStrings[websiteType] }}</i> website.
          <br />
          Should it be single or multi-page?
        </q-banner>
        <div class="text-center">
          <q-btn-toggle
            v-model="websiteSinglePage"
            no-caps
            rounded
            unelevated
            push
            class="q-my-md q-mx-lg"
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Single-page website', value: true, slot: 'single' },
              { label: 'Multi-page website', value: false, slot: 'multi' }
            ]"
          >
            <!--<template v-slot:single>-->
            <!--  <div class="row items-center no-wrap">-->
            <!--    <div class="text-center">-->
            <!--      Single-page website-->
            <!--    </div>-->
            <!--    <q-icon right :name="websiteSinglePage ? 'radio_button_checked' : 'radio_button_unchecked'" />-->
            <!--  </div>-->
            <!--</template>-->
            <!--<template v-slot:multi>-->
            <!--  <div class="row items-center no-wrap">-->
            <!--    <q-icon left :name="!websiteSinglePage ? 'radio_button_checked' : 'radio_button_unchecked'" />-->
            <!--    <div class="text-center">-->
            <!--      Multi-page website-->
            <!--    </div>-->
            <!--  </div>-->
            <!--</template>-->
          </q-btn-toggle>
        </div>
      </div>
      <!--</q-card-section>-->

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-on:click="close()" />
        <q-btn flat label="Ok" v-on:click="onCreateWebsiteClick()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import { ConfigurationThemeEnum } from 'app/src-common/enums/ConfigurationThemeEnum'
import { NewWebsiteTypeEnum, newWebsiteTypeStrings } from 'app/src-common/enums/NewWebsiteTypeEnum'
import { Errors } from 'src/helpers/errors'

export default defineComponent({
  model: {
    prop: 'show',
    event: 'update:show'
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'create-website-clicked',
    'import-website-clicked',
    'update:show'
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup (props, { emit }) {
    const showCopy = ref(props.show)
    watch(() => props.show, (newValue) => {
      showCopy.value = newValue
    })
    watch(showCopy, (newValue) => {
      emit('update:show', newValue)
    })
    function open (type: NewWebsiteTypeEnum = NewWebsiteTypeEnum.Empty) {
      showCopy.value = true
      title.value = ''
      themeValue.value = themeOptions.value[0]
      websiteType.value = type
      emit('update:show', true)
    }
    function close () {
      showCopy.value = false
      errors.value.clear()
      emit('update:show', false)
    }

    const title = ref('')
    const themeOptions = ref([
      {
        label: 'Al-Folio',
        value: ConfigurationThemeEnum.AlFolio,
        description: 'Based on https://github.com/alshedivat/al-folio'
      },
      {
        label: 'Mono-Researcher',
        value: ConfigurationThemeEnum.MonoResearcher,
        description: 'Based on https://github.com/ojroques/hugo-researcher'
      }
    ])
    const themeValue = ref(themeOptions.value[0])

    // watch(themeValue, (newValue) => {
    //   console.log(newValue)
    // })

    const websiteType: Ref<NewWebsiteTypeEnum> = ref(NewWebsiteTypeEnum.Empty)
    const websiteSinglePage: Ref<boolean> = ref(false)

    const errors = ref(new Errors())

    function onCreateWebsiteClick () {
      errors.value.clear()
      if (title.value === '') {
        const validationErrors: Record<string, Array<string>> = {
          title: ['Please provide a title for the new website']
        }
        errors.value.record(validationErrors)
        return
      }
      emit(
        'create-website-clicked',
        title.value,
        themeValue.value.value,
        websiteType.value,
        websiteSinglePage.value
      )
    }

    function onImportWebsiteClick () {
      emit('import-website-clicked')
    }

    return {
      showCopy,
      title,
      themeValue,
      themeOptions,
      websiteType,
      NewWebsiteTypeEnum,
      newWebsiteTypeStrings,
      websiteSinglePage,
      onCreateWebsiteClick,
      errors,
      open,
      close,
      onImportWebsiteClick
    }
  }
})
</script>
