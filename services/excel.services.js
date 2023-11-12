import moment from "moment";
import * as XLSX from 'xlsx';
export const downloadFile = (title, data_items) => {
    let newArr = null;
console.log(title, data_items)
    switch (title?.toLowerCase()) {
        case "colors":
            newArr = data_items.map(
                ({
                    merchandise,
                    values,
                    created_at,
                }) => {
                    return {
                        Merchandise: merchandise,
                        Values: values,
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        case "sizes":
            newArr = data_items.map(
                ({
                    merchandise,
                    values,
                    created_at,
                }) => {
                    return {
                        Merchandise: merchandise,
                        Values: values,
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        case "categories":
            newArr = data_items.map(
                ({
                    category,
                    created_at,
                }) => {
                    return {
                        Category: category,
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        case "users":
            newArr = data_items.map(
                ({
                    first_name,
                    last_name,
                    email,
                    contact_no,
                    profile_image,
                    role,
                    created_at
                }) => {
                    return {
                        "First Name": first_name,
                        "Last Name": last_name,
                        "Email": email,
                        "Contact": contact_no,
                        "Profile Image": profile_image,
                        "Role": role == 0 ? "Customer" : role == 1 ? "Artist" : role == 2 && "Admin",
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        case "products":
            newArr = data_items.map(
                ({
                    images,
                    description,
                    product_name,
                    price,
                    category,
                    merchandise,
                    colors,
                    sizes,
                    is_featured,
                    is_archived,
                    is_sold_out,
                    created_at
                }) => {
                    return {
                        "Product Name": product_name,
                        Price: price,
                        Description: description,
                        Images: images.join(", "),
                        Category: category?.category,
                        Merchandise: merchandise,
                        Colors: colors?.join(", "),
                        Sizes: sizes?.join(", "),
                        "Is Featured": is_featured ? "YES" : "NO",
                        "Is Archived": is_archived ? "YES" : "NO",
                        "Is Sold Out": is_sold_out ? "YES" : "NO",
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        case "orders":
            newArr = data_items.map(
                ({
                    name,
                    contact_no,
                    address,
                    information,
                    total_price,
                    products,
                    is_paid,
                    status,
                    mop,
                    user_id,
                    created_at
                }) => {
                    return {
                        "Name": name,
                        "Contact": contact_no,
                        "Address": address,
                        "Information": information,
                        "Total Price": total_price,
                        "Products Link": products?.map((p)=>p?._id).join(", "),
                        "Is Paid": is_paid ? "YES" : "NO",
                        "Status": status,
                        "Mode of Payment": mop,
                        "User ID": user_id,
                        "Date Created": moment(created_at).format("MMM DD, YYYY hh:mm:ss A"),
                    };
                }
            );
            break;
        default:
            return;
    }
    var myFile = `${title?.toLowerCase().replace(" ", "_")}_${moment().format(
        "YYYY-MM-DD hh:mm:ss"
    )}.xlsx`;
    var myWorkSheet = XLSX.utils.json_to_sheet(newArr);
    var myWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
    XLSX.writeFile(myWorkBook, myFile);
};