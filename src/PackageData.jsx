import { useTranslation } from "react-i18next";

const usePackageData = () => {
  const { t } = useTranslation();

  return [
    {
      category: "intro",
      categoryTitle: t("packages.packages.intro.categoryTitle"),
      packageTitle: t("packages.packages.intro.packageTitle"),
      packagePrice: t("packages.packages.intro.packagePrice"),
      paymentSched: t("packages.packages.intro.paymentSched"),
      credits: t("packages.packages.intro.credits"),
      access: t("packages.packages.intro.access"),
      validity: t("packages.packages.intro.validity"),
      paymentLink: "/checkout-intro",
    },
    {
      category: "class",
      categoryTitle: t("packages.packages.dropIn.categoryTitle"),
      packageTitle: t("packages.packages.dropIn.packageTitle"),
      packagePrice: t("packages.packages.dropIn.packagePrice"),
      paymentSched: t("packages.packages.dropIn.paymentSched"),
      credits: t("packages.packages.dropIn.credits"),
      access: t("packages.packages.dropIn.access"),
      validity: t("packages.packages.dropIn.validity"),
      paymentLink: "/checkout-dropin",
    },
    {
      category: "class",
      categoryTitle: t("packages.packages.fourClasses.categoryTitle"),
      packageTitle: t("packages.packages.fourClasses.packageTitle"),
      packagePrice: t("packages.packages.fourClasses.packagePrice"),
      paymentSched: t("packages.packages.fourClasses.paymentSched"),
      credits: t("packages.packages.fourClasses.credits"),
      access: t("packages.packages.fourClasses.access"),
      validity: t("packages.packages.fourClasses.validity"),
      paymentLink: "/checkout-fourclasses",
    },
    {
      category: "share",
      categoryTitle: t("packages.packages.twentyFiveClasses.categoryTitle"),
      packageTitle: t("packages.packages.twentyFiveClasses.packageTitle"),
      packagePrice: t("packages.packages.twentyFiveClasses.packagePrice"),
      paymentSched: t("packages.packages.twentyFiveClasses.paymentSched"),
      credits: t("packages.packages.twentyFiveClasses.credits"),
      access: t("packages.packages.twentyFiveClasses.access"),
      validity: t("packages.packages.twentyFiveClasses.validity"),
      paymentLink: "/checkout-25classes",
    },
  ];
};

export default usePackageData;
