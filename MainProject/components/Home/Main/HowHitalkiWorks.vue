<template>
  <div class="how-hitalki-works-container container mx-auto my-4">
    <div class="mx-auto">
      <header class="w-full my-4">
        <h3 class="text-lg text-center">{{ $t("main.takeclass") }}</h3>
      </header>
      <div>
        <ol>
          <li
            class="flex flex-col sm:flex-row items-center justify-around my-4"
          >
            <div class="flex items-center order-2 sm:order-1">
              <p
                class="
                  w-14
                  h-14
                  my-4
                  sm:my-0
                  rounded-full
                  text-lg
                  flex
                  items-center
                  justify-center
                  bg-primary bg-opacity-60
                  text-primary
                  ml-6
                "
              >
                {{ $t("howhitalkiworks.one") }}
              </p>
            </div>
            <div
              class="
                flex flex-col
                items-center
                sm:items-start
                order-3
                sm:order-2
              "
            >
              <p class="text-lg mb-2">استادت رو انتخاب کن</p>
              <p class="w-full sm:w-1/2 text-sm text-gray-700">
                بهترین استادی که همه جوره بهت میخوره رو از صفحه انتخاب اساتید انتخاب کن.
              </p>
            </div>
            <img
              class="w-60 sm:w-1/3 order-1 sm:order-3"
              src="/howHiTalki/step1.webp"
              alt="Cards contain details about teachers"
            />
          </li>
          <li
            class="flex flex-col sm:flex-row items-center justify-around my-4"
          >
            <div class="flex items-center order-2 sm:order-1">
              <p
                class="
                  w-14
                  h-14
                  my-4
                  sm:my-0
                  rounded-full
                  text-lg
                  flex
                  items-center
                  justify-center
                  bg-primary bg-opacity-60
                  text-primary
                  ml-6
                "
              >
                {{ $t("howhitalkiworks.two") }}
              </p>
            </div>
            <div
              class="
                flex flex-col
                items-center
                sm:items-start
                order-3
                sm:order-2
              "
            >
              <p class="text-lg mb-2">زمان کلاست رو تعیین کن</p>
              <p class="w-full sm:w-1/2 text-sm text-gray-700">
                تقویم استادت رو چک کن و اون زمان هایی که با برنامه خودت همخوانی داره  رو انتخاب کن.
              </p>
            </div>
            <img
              class="w-60 sm:w-1/3 order-1 sm:order-3"
              src="/howHiTalki/step2.webp"
              alt="Time table to reserve class times"
            />
          </li>
          <li
            class="flex flex-col sm:flex-row items-center justify-around my-4"
          >
            <div class="flex items-center order-2 sm:order-1">
              <p
                class="
                  w-14
                  h-14
                  my-4
                  sm:my-0
                  rounded-full
                  text-lg
                  flex
                  items-center
                  justify-center
                  bg-primary bg-opacity-60
                  text-primary
                  ml-6
                "
              >
                {{ $t("howhitalkiworks.three") }}
              </p>
            </div>
            <div
              class="
                flex flex-col
                items-center
                sm:items-start
                order-3
                sm:order-2
              "
            >
              <p class="text-lg mb-2">کلاست رو شروع کن</p>
              <p class="w-full sm:w-1/2 text-sm text-gray-700">
                به همین راحتی میتونی کلاس زبانت رو شروع کنی و ازش لذت ببری.
              </p>
            </div>
            <img
              class="w-60 sm:w-1/3 order-1 sm:order-3"
              src="/howHiTalki/step3.webp"
              alt="An online class"
            />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
