<template>
  <div class="overflow-x-auto w-full relative">
    <table class="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>
            {{ $t("wallet.transactions.title") }}
          </th>
          <th>
            {{ $t("wallet.transactions.date") }}
          </th>
          <th>
            {{ $t("wallet.transactions.amount") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="hover"
        >
          <th v-if="isDeposit(transaction)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </th>
          <th v-if="!isDeposit(transaction)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </th>
          <td @click="openModal(transaction)" class="cursor-pointer">
            {{ transDesc(transaction.meta.description) }}
          </td>
          <td>
            {{ createdTimeStampToWeekDay(parseDate(transaction.created_at)) }}
            {{ createdTimeStampToDay(parseDate(transaction.created_at)) }}
            {{ createdTimeStampToMonth(parseDate(transaction.created_at)) }}
            {{ $t("orders.hour") }}
            {{ createdTimeStampFromHour(parseDate(transaction.created_at)) }}
          </td>
          <td class="flex items-center justify-end">
            {{ addPlus(transaction) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal modal-open" v-if="renderDescModal">
      <div class="modal-box w-full">
        <svg
          @click="closeDescModal"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute top-2 right-3 text-red-600 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="w-full my-4 max-h-40 overflow-y-auto">
          {{ tempDesc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
    },
  },
  data() {
    return {
      renderDescModal: false,
      tempDesc: null,
    };
  },
  methods: {
    openModal(transaction) {
      this.tempDesc = transaction.meta.description;
      this.renderDescModal = true;
    },
    closeDescModal() {
      this.renderDescModal = false;
      this.tempDesc = null;
    },
    transDesc(trans) {
      if (trans.length > 40) {
        return trans.substring(0, 40) + "...";
      } else {
        return trans;
      }
    },
    parseDate(date) {
      return Date.parse(date);
    },
    createdTimeStampToDay(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        day: "numeric",
      });
    },
    createdTimeStampToWeekDay(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        weekday: "long",
      });
    },
    createdTimeStampToMonth(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        month: "long",
      });
    },
    createdTimeStampFromHour(timestamp) {
      return new Date(timestamp).toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      });
    },
    isDeposit(transaction) {
      if (transaction.type == "deposit") {
        return true;
      }
    },
    addPlus(transaction) {
      if (transaction.type == "deposit") {
        return Intl.NumberFormat("fa-IR").format(transaction.amount) + "+";
      } else {
        return Intl.NumberFormat("fa-IR").format(transaction.amount);
      }
    },
  },
};
</script>
