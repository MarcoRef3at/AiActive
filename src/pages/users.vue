<template>
  <div>
    <vue-html2pdf
      :show-layout="controlValue.showLayout"
      :float-layout="controlValue.floatLayout"
      :enable-download="controlValue.enableDownload"
      :preview-modal="controlValue.previewModal"
      :filename="controlValue.filename"
      :paginate-elements-by-height="controlValue.paginateElementsByHeight"
      :pdf-quality="controlValue.pdfQuality"
      :pdf-format="controlValue.pdfFormat"
      :pdf-orientation="controlValue.pdfOrientation"
      :pdf-content-width="controlValue.pdfContentWidth"
      :manual-pagination="controlValue.manualPagination"
      :html-to-pdf-options="htmlToPdfOptions"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content" class="pdf-content">
        <div class="bg-blue text-white text-center q-pa-md flex flex-center">
          <div>
            <div style="font-size: 15vh">
              users page
            </div>

            <div class="text-h2" style="opacity:.4">
              Oops. Nothing here...
            </div>

            <q-btn
              class="q-mt-xl"
              color="white"
              text-color="blue"
              unelevated
              label="PDF"
              @click="downloadPdf()"
              no-caps
            />
          </div>
        </div>
      </section>
    </vue-html2pdf>
    <controls-container
      :progress="progress"
      @generateReport="downloadPdf()"
      :controlValue="controlValue"
    />
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import ControlsContainer from "../components/ControlsContainer";
export default {
  name: "Error404",
  data() {
    return {
      listOpen: true,
      hover: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
      controlValue: {
        showLayout: false,
        floatLayout: false,
        enableDownload: false,
        previewModal: true,
        paginateElementsByHeight: 1100,
        manualPagination: false,
        filename: "Hee Hee",
        pdfQuality: 2,
        pdfFormat: "a4",
        pdfOrientation: "portrait",
        pdfContentWidth: "800px"
      }
    };
  },
  computed: {
    htmlToPdfOptions() {
      return {
        margin: 0,

        filename: "hee hee.pdf",

        image: {
          type: "jpeg",
          quality: 0.98
        },

        enableLinks: true,

        html2canvas: {
          scale: this.controlValue.pdfQuality,
          useCORS: true
        },

        jsPDF: {
          unit: "in",
          format: this.controlValue.pdfFormat,
          orientation: this.controlValue.pdfOrientation
        }
      };
    }
  },
  methods: {
    downloadPdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation progress: ${progress}%`);
    },
    startPagination() {
      console.log(`PDF has started pagination`);
    },
    hasPaginated() {
      console.log(`PDF has been paginated`);
    },
    async beforeDownload() {
      console.log(`On Before PDF Generation`);
    },
    hasDownloaded(blobPdf) {
      console.log(`PDF has downloaded yehey`);
      this.pdfDownloaded = true;
      console.log(blobPdf);
    }
  },
  components: {
    VueHtml2pdf,
    ControlsContainer
  }
};
</script>
