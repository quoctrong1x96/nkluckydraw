import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/**
1. Upload data excel
2. Xáo trộn bảng
3. Xem giải thưởng
4. Chọn giải để quay trúng thưởng
 + Mỗi giải có số lần sau khác nhau.
 + Mỗi lần quay trúng thưởng:
    => Người trúng sẽ được cập nhật danh sách vào bảng trúng giải theo ID => Người trúng không nằm trong danh sách quay tiếp theo
    => Cập nhật danh sách người trúng giải, danh sách này có tên, và giải thưởng
    => Cập nhật số lần quay của giải thưởng giảm xuống
 + Khi quay trúng:
    => Hiển thị tên người trúng giải và giải thưởng tương ứng để trao giải.
    => Có thể ấn quay về màn hình xem danh sách người trúng thưởng hoặc danh sách giải thưởng còn chờ quay (có số lần quay còn lại)
 + Khi giải thưởng nào quay hết, thì làm màu đen xám out of stocks
 + Có thể xem lại danh sách gồm người trúng giải, và người được phép tham gia vòng quay kế tiếp.
 + Danh sách giải thưởng có hiển thị tên người trúng giải
 + Danh sách người trúng giải có ô vuông nhỏ thể hiện giải thưởng và tên giải thưởng <Tên giải thưởng có màu sắc sáng neon>
 */
